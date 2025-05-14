const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("PicturePayment", function () {
  // We define a fixture to reuse the same setup in every test.
  async function deployPicturePaymentFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, buyer1, buyer2] = await ethers.getSigners();

    const PicturePayment = await ethers.getContractFactory("PicturePayment");
    const picturePayment = await PicturePayment.deploy();

    return { picturePayment, owner, buyer1, buyer2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { picturePayment, owner } = await loadFixture(
        deployPicturePaymentFixture
      );
      expect(await picturePayment.owner()).to.equal(owner.address);
    });

    it("Should have zero balance initially", async function () {
      const { picturePayment } = await loadFixture(deployPicturePaymentFixture);
      expect(await picturePayment.getBalance()).to.equal(0);
    });
  });

  describe("Purchases", function () {
    it("Should revert when payment is zero", async function () {
      const { picturePayment, buyer1 } = await loadFixture(
        deployPicturePaymentFixture
      );

      const pictureId = 1;
      await expect(
        picturePayment.connect(buyer1).purchasePicture(pictureId, { value: 0 })
      ).to.be.revertedWith("Payment must be greater than 0");
    });

    it("Should transfer payment to owner", async function () {
      const { picturePayment, owner, buyer1 } = await loadFixture(
        deployPicturePaymentFixture
      );

      const pictureId = 1;
      const paymentAmount = ethers.parseEther("0.1");

      await expect(
        picturePayment
          .connect(buyer1)
          .purchasePicture(pictureId, { value: paymentAmount })
      ).to.changeEtherBalances(
        [buyer1, owner],
        [-paymentAmount, paymentAmount]
      );
    });

    it("Should emit PicturePurchased event", async function () {
      const { picturePayment, buyer1 } = await loadFixture(
        deployPicturePaymentFixture
      );

      const pictureId = 1;
      const paymentAmount = ethers.parseEther("0.1");

      await expect(
        picturePayment
          .connect(buyer1)
          .purchasePicture(pictureId, { value: paymentAmount })
      )
        .to.emit(picturePayment, "PicturePurchased")
        .withArgs(buyer1.address, pictureId, paymentAmount);
    });

    it("Multiple users can purchase pictures", async function () {
      const { picturePayment, owner, buyer1, buyer2 } = await loadFixture(
        deployPicturePaymentFixture
      );

      // Buyer 1 purchases picture ID 1
      const pictureId1 = 1;
      const paymentAmount1 = ethers.parseEther("0.1");
      await expect(
        picturePayment
          .connect(buyer1)
          .purchasePicture(pictureId1, { value: paymentAmount1 })
      ).to.changeEtherBalances(
        [buyer1, owner],
        [-paymentAmount1, paymentAmount1]
      );

      // Buyer 2 purchases picture ID 2
      const pictureId2 = 2;
      const paymentAmount2 = ethers.parseEther("0.2");
      await expect(
        picturePayment
          .connect(buyer2)
          .purchasePicture(pictureId2, { value: paymentAmount2 })
      ).to.changeEtherBalances(
        [buyer2, owner],
        [-paymentAmount2, paymentAmount2]
      );
    });
  });
});
