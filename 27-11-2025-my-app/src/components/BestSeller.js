import Carousel from "@/reusableCompo/Carousel";

function BestSeller() {
  const images = [
    { src: '/images/heroDoor/heroDoor/1.png', title: 'Door 1' },
    { src: '/images/heroDoor/heroDoor/2.png', title: 'Door 2' },
    { src: '/images/heroDoor/heroDoor/3.png', title: 'Door 3' },
    { src: '/images/heroDoor/heroDoor/4.png', title: 'Door 4' },
    { src: '/images/heroDoor/heroDoor/5.png', title: 'Door 5' },
    { src: '/images/heroDoor/heroDoor/6.png', title: 'Door 6' },
    { src: '/images/heroDoor/heroDoor/7.png', title: 'Door 7' },
    { src: '/images/heroDoor/heroDoor/8.png', title: 'Door 8' }
  ];
  

  return (
    <div className="best-seller-section">
      <h2 className="best-seller-heading">BEST-SELLER</h2>

      <Carousel images={images} />
    </div>
  );
}

export default BestSeller;
