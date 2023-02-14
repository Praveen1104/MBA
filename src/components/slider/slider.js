import {CCarousel,CImage,CCarouselItem} from  '@coreui/react'
import img1 from '../../assets/images1.jpg';
import img2 from '../../assets/images2.jpg'
import img3 from '../../assets/images3.jpg';
import img4 from '../../assets/images4.jpg';
function Slider() {
  return (
    <div>
      <CCarousel controls>
        <CCarouselItem >
          <CImage d-flex w-100
            className="d-block w-100"
            src={img1}
            alt="slide 1"
//CCarousel, CImage, CCarouselItem "@coreui/react";
          />
        </CCarouselItem>
        <CCarouselItem>
          <CImage d-block w-100
            className="d-block w-100"
            src={img2}
            alt="slide 2"
          />
        </CCarouselItem>
        <CCarouselItem>
          <CImage d-block w-100
            className="d-block w-100"
            src={img3}
            alt="slide 3"
          />
        </CCarouselItem>
        <CCarouselItem>
          <CImage d-block w-100
            className="d-block w-100"
            src={img4}
            alt="slide 3"
          />
        </CCarouselItem>
      </CCarousel>
    </div>
  );
}

export default Slider;