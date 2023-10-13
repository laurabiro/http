import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "usehooks-ts";
import { EffectCards } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "/src/index.css";

type Slide = {
  isImage: boolean;
  title: string;
  content: string;
};

const Menu = () => {
  const slides: Slide[] = [
    {
      title: "my livingroom",
      content:
        "Place selected items to your livingroom and see if they match. You can replace the selected item anytime with another one. To do this, pick something from the lists and click on the livingroom button, right next to the basket button. Enjoy!",
      isImage: false,
    },
    {
      title: "my basket",
      content:
        "Go to your basket anytime you want to see your order so far, you can also change quantity or delete items. Once you ready, just follow the instructions underneath your order list. Please make sure to check everything twice, and contact us, if any issue accures.",
      isImage: false,
    },
    { title: "tables", content: "/table.png", isImage: true },
    { title: "chairs", content: "/chair.png", isImage: true },
    { title: "cabinets", content: "/cabinet.png", isImage: true },
    { title: "lamps", content: "/lamp.png", isImage: true },
    { title: "carpets", content: "/carpet.png", isImage: true },
    { title: "frames", content: "/frame.png", isImage: true },
    {
      title: "newsletter",
      content:
        "Do not worry if you could not find the right item for your livingroom! We are always after new designs, so sign up to our newsletter, and come back later! We will make sure you get updated about anything you choose to be so. Contact us, if you need help!",
      isImage: false,
    },
    { title: "all stuff", content: "/livingroom.jpg", isImage: true },
    {
      title: "FAQ's",
      content:
        "Check out the questions, you might find informations about things that you could not find, we hope you can get along this page very easily, but if you have any question other than these, feel free to drop us a message! (menu - contact)",
      isImage: false,
    },
  ];

  const matches = useMediaQuery("(max-width: 1000px)");

  return (
    <>
      {matches ? (
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          
        >
          {slides.map((slide) => (
            <SwiperSlide>
              <p>{slide.title}</p>
              <div className="cards">
                {slide.isImage ? (
                  <img className="tables" src={slide.content} alt="" />
                ) : (
                  <p className="text">{slide.content}</p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>
          <div className="floor"></div>
          <img className="tables" src="/table.png" alt="" />
          <img className="chairs" src="/chair.png" alt="" />
          <img className="lamps" src="/lamp.png" alt="" />
          <img className="cabinets" src="/cabinet.png" alt="" />
          <img className="carpets" src="/carpet.png" alt="" />
          <img className="frames" src="/frame.png" alt="" />
        </div>
      )}
    </>
  );
};

export default Menu;

/* function Menu() {
  return (
   
  )
}

export default Menu */
