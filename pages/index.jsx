import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import gsap from "gsap";

import emoji from "../assets/emoji-wow.gif";
import Image from "next/image";

let interval = undefined;

export default function Home() {
  const userInstagram = "https://www.instagram.com/whoisdhan_/";
  const userLinkedIn = "https://www.linkedin.com/in/ramadhansa/";

  const userGithub = "https://github.com/MRSA-ID";

  const userYoutube =
    "https://www.youtube.com/channel/UC_sGPi7Qg-5VMjA7_8M00Nw";

  const userDribbble = "https://dribbble.com/MRSA-DR";
  const [progress, setProgress] = useState(0);
  const [dateState, setDateState] = useState(new Date());
  const [contactKonten, setContactKonten] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [localCoords, setLocalCoords] = useState({ x: 0, y: 0 });

  const refH1 = useRef(null);
  const refCursor = useRef(null);
  const eyesLeft = useRef(null);
  const eyes1 = useRef(null);
  const eyesRight = useRef(null);
  const emojiWow = useRef(null);

  const counterValid = progress <= 99;
  const timeline = gsap.timeline();
  const mainScreen = gsap
    .timeline
    //   {
    //   paused: "true",
    // }
    ();

  const HandleClickContact = () => {
    setContactKonten((prevstate) => !prevstate);
  };

  useEffect(() => {
    timeline.from(".eyes1", {
      duration: 0.4,
      scale: 0,
      opacity: 0,
    });
    timeline.from(".title_loader", {
      duration: 0.5,
      y: 10,
      opacity: 0,
    });
    timeline.from("#loader", {
      scale: 0,
      duration: 0.2,
    });
    timeline.from(".bracket", {
      scale: 0,
      duration: 0.3,
      margin: 0,
    });
    timeline.addPause(1.38);
    // mainScreen.resume(1);
    // if (progress === 100) {
    //   mainScreen.to(".loading_section", {
    //     y: -10,
    //     opacity: 0,
    //   });
    //   mainScreen.to(".loading_screen", {
    //     duration: 0.2,
    //     y: -2000,
    //   });
    //   mainScreen.from(
    //     "h1",
    //     {
    //       y: 200,
    //       duration: 0.5,
    //       stagger: {
    //         amount: 0.2,
    //       },
    //     },
    //     "-=1.7"
    //   );
    // }
  }, []);

  useEffect(() => {
    if (progress === 100) {
      mainScreen.to(".eyes1", {
        duration: 0.6,
        scale: 0,
        // opacity: 0,
      });
      mainScreen.to(".loading_section", {
        duration: 0.6,
        y: -10,
        opacity: 0,
      });
      mainScreen.to(".loading_screen", {
        duration: 0.8,
        opacity: 0,
        x: -2000,
        ease: "Power4.out",
      });
      mainScreen.from(
        "h1 > *, .subTitle, .short_about > p",
        {
          opacity: 0,
          yPercent: 100,
          duration: 1.5,
          ease: "power4",
          stagger: 0.1,
        },
        ">-0.5"
      );
      mainScreen.from(
        ".wrapper_more_content",
        {
          opacity: 0,
          xPercent: -10,
          duration: 1.5,
          ease: "power4",
          stagger: 0.1,
        },
        ">-1.5"
      );
      mainScreen.from(
        "h3 > hr",
        {
          opacity: 0,
          width: 100,
          duration: 1.5,
          ease: "power4",
          stagger: 0.1,
        },
        ">-1"
      );
      mainScreen.from(
        ".calendar, .time",
        {
          opacity: 0,
          yPercent: 100,
          duration: 1.5,
          ease: "power4",
          stagger: 0.1,
        },
        "<-0.5"
      );
      mainScreen.from(
        ".contact",
        {
          yPercent: 100,
          opacity: 0,
          duration: 1.5,
          ease: "power4",
          stagger: 0.1,
        },
        "<-0.5"
      );
    }
  }, [progress]);

  useEffect(() => {
    interval =
      counterValid &&
      setInterval(() => {
        setProgress((prevstate) => prevstate + 1);
      }, 80);
    return () => clearInterval(interval);
  }, [counterValid]);

  useEffect(() => {
    // console.log(progress);
    if (progress === 100) {
      return () => {
        clearInterval(interval);
        mainScreen.play();
      };
    }
  }, [progress]);

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  const EyeBall = useCallback((e) => {
    if (eyesLeft !== null || eyesRight !== null) {
      let xl =
        eyesLeft.current.getBoundingClientRect().left +
        eyesLeft.current.clientWidth / 2;
      let yl =
        eyesLeft.current.getBoundingClientRect().top +
        eyesLeft.current.clientHeight / 2;

      // let xr =
      //   eyesRight.current.getBoundingClientRect().left +
      //   eyesRight.current.clientWidth / 2;
      // let yr =
      //   eyesRight.current.getBoundingClientRect().top +
      //   eyesRight.current.clientHeight / 2;

      let radianL = Math.atan2(e.clientX - xl, e.clientY - yl);
      let rotL = radianL * (180 / Math.PI) * -1 + 270;
      eyesLeft.current.style.transform = `rotate(${rotL}deg)`;

      // let radianR = Math.atan2(e.clientX - xr, e.clientY - yr);
      // let rotR = radianR * (180 / Math.PI) * -1 + 270;
      // eyesRight.current.style.transform = `rotate(${rotR}deg)`;
    }
  });

  const EmojiMove = (e) => {
    let valueX = (e.pageX * -1) / 200;
    let valueY = (e.pageY * -1) / 200;
    emojiWow.current.style.transform = `translate(${valueX}px,${valueY}px)`;
  };

  // const moveFace = (e) => {
  //   if (faceEmoji !== null) {
  //     let x = faceEmoji.current.offsetLeft + faceEmoji.current.clientWidth / 2;
  //     let y = faceEmoji.current.offsetTop + faceEmoji.current.clientHeight / 2;
  //     faceEmoji.current.style.transform = `translateX(${e.clientX})`;
  //   }
  // };

  // const

  const mouseOverTitle = () => {
    refCursor.current.classList.add("grow");
    refCursor.current.style.animationName = "borderAnim";
  };

  const mouseLeaveTitle = () => {
    refCursor.current.classList.remove("grow");
    refCursor.current.style.animationName = "";
  };

  const mouseOverLink = (e) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    setLocalCoords({
      x: e.pageX - currentTargetRect.left,
      y: e.pageY - currentTargetRect.top,
    });

    refCursor.current.classList.add("pointer");
  };
  const mouseLeaveLink = (e) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();

    setLocalCoords({
      x: e.pageX - currentTargetRect.left,
      y: e.pageY - currentTargetRect.top,
    });

    refCursor.current.classList.remove("pointer");
  };

  const mouseMove = (e) => {
    setMousePosition({
      x: e.pageX,
      y: e.pageY,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mousemove", EyeBall);
      // window.addEventListener("mouseover", mouseOverLink);
      // window.addEventListener("mouseover", mouseOverLink)
      window.addEventListener("mousemove", EmojiMove);

      // const data = window.localStorage.getItem("Jarak");
      // if (data !== 0) {
      //   setJarakFromLocal(data);
      // }

      // function handleWindowResize() {
      //   setWindowSize(getWindowSize());
      //   if (windowSize.innerWidth < 1580) {
      //     if (jarak !== 68) {
      //       if (jarakFromLocal !== 68) {
      //         setJarak((prevstate) => prevstate + 2);
      //       }
      //     }
      //   }
      //   if (windowSize.innerWidth > 1580) {
      //     if (jarak !== 0) {
      //       setJarak((prevstate) => {
      //         if (prevstate === 0) {
      //           return prevstate;
      //         } else {
      //           return prevstate - 4;
      //         }
      //       });
      //     }
      //   }
      // }

      // window.addEventListener("resize", handleWindowResize);

      return () => {
        // window.removeEventListener("resize", handleWindowResize);
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mousemove", EyeBall);
        // window.removeEventListener("mouseover", mouseOverLink);
        window.removeEventListener("mousemove", EmojiMove);
      };
    }
  }, [refH1, eyesLeft]);

  return (
    <div
      className={`relative h-screen w-screen transform-gpu font-WorkSans transition-all duration-300 ease-in 
      md:p-[51px] lg:p-[34px] xl:p-[28px] 2xl:p-[0px]
      `}
      // style={{ padding: `${jarakFromLocalMain}px` }}
    >
      <Head>
        <title>Ramadhan</title>
        <meta
          name="description"
          content="Muhammad Ramadhan Sangisda Alam portofolio"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className={`cursor ${progress === 100 ? "block" : "hidden"}`}
        ref={refCursor}
        style={{
          left: mousePosition.x + "px",
          top: mousePosition.y + "px",
        }}></div>

      <div className="loading_screen absolute left-0">
        <div className="loading_section absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col">
          <div className="eyes1" ref={eyes1}>
            <div className="eye1 animate-irishTracking"></div>
          </div>
          <div className="mt-5 flex text-4xl">
            <h3 className="title_loader mr-2 font-bold uppercase tracking-wider">
              Wait
            </h3>
            <span className="bracket bracket1 font-bold">(</span>
            <div className="mx-3 font-bold tracking-wider" id="loader">
              {progress}%
            </div>
            <span className="bracket bracket2 mr-2 font-bold">)</span>
            <h3 className="title_loader font-bold uppercase tracking-wider">
              The Minute
            </h3>
          </div>
        </div>
      </div>

      <div className="main_screen h-full w-full">
        <main
          className={`relative flex
        h-full 
         flex-col bg-white/60 p-[10px]
         px-14 text-black backdrop-blur-[100px] md:rounded-[17px] 2xl:rounded-[0px]`}>
          <nav className="flex justify-between text-lg font-medium md:pt-5">
            <div className="calendar">
              <span className="tracking-wide">
                {dateState.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="time">
              <div className="eyes">
                <div className="eye" ref={eyesLeft}></div>
              </div>
              <span className="text-3xl font-light tracking-wide">
                {dateState.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>
            </div>
            <div>
              <div className="contact">
                <button
                  onMouseOver={mouseOverTitle}
                  onMouseLeave={mouseLeaveTitle}
                  onClick={HandleClickContact}
                  className={` relative transform-gpu cursor-none rounded-full duration-500 ${
                    contactKonten
                      ? "z-0 scale-[0] opacity-0"
                      : "z-50 opacity-100"
                  } bg-white p-1.5 px-6 text-base font-medium tracking-wide`}>
                  <span>contact</span>
                </button>
              </div>
              <div
                className={` flex items-center justify-center bg-white drop-shadow-xl transition-all duration-[1500ms] lg:justify-end lg:rounded-none lg:pr-[12%] xl:pr-[10%] 2xl:pb-24 ${
                  contactKonten
                    ? "absolute top-0 right-0 z-20  h-full w-full opacity-100 md:rounded-[17px] lg:h-2/4 lg:w-1/3 lg:rounded-tr-[24px] lg:rounded-bl-[500px] xl:h-2/4 xl:w-1/3 xl:rounded-tr-[20px] 2xl:h-3/5 2xl:w-1/3"
                    : "absolute top-0 right-0 -z-10 h-0 w-0 rounded-bl-[500px] opacity-0 lg:rounded-bl-[0px] "
                } `}>
                {" "}
                <button
                  onClick={HandleClickContact}
                  className={`absolute top-5 right-5 mx-auto h-10 w-10 rounded-lg bg-neutral-200/50 p-1.5  ${
                    contactKonten
                      ? "scale-100 opacity-100 delay-300"
                      : "scale-0 opacity-0 delay-75"
                  }`}>
                  <XMarkIcon className="stroke-2 text-neutral-700 transition-transform duration-700 hover:rotate-[190deg]" />
                </button>
                <ul
                  className={` transform  text-2xl delay-700 duration-500 ease-in-out md:space-y-10 lg:space-y-0 lg:pb-14 lg:text-base xl:pb-8 xl:text-lg 2xl:space-y-8 2xl:pb-0 ${
                    contactKonten
                      ? "w-max scale-100 opacity-100 "
                      : "scale-0 opacity-0 "
                  }`}>
                  <li
                    onMouseOver={mouseOverTitle}
                    onMouseLeave={mouseLeaveTitle}
                    className={`group flex h-full w-full py-3 ${
                      contactKonten ? "animate-leftToRight" : "opacity-0"
                    }`}>
                    <span
                      className={`inline-block transform duration-700 group-hover:-translate-x-14 `}>
                      Instagram
                    </span>
                    <div
                      onMouseOver={mouseOverLink}
                      onMouseLeave={mouseLeaveLink}
                      className="relative h-full w-full hover:text-white">
                      <div className="wrapper absolute w-0 -translate-x-10 transform overflow-hidden rounded-xl bg-white mix-blend-difference transition-all duration-100 ease-linear group-hover:w-[189px] group-hover:border-2 group-hover:lg:w-[145px]  ">
                        <div className="relative h-full w-full">
                          <span
                            className="circle"
                            style={{
                              left: localCoords.x + "px",
                              top: localCoords.y + "px",
                            }}></span>
                        </div>
                        <a
                          className=" block h-full w-full group-hover:px-2"
                          href={`${userInstagram}`}
                          target="_blank">
                          {"@" + userInstagram.split("/")[3]}
                        </a>
                      </div>
                    </div>
                  </li>
                  <li
                    onMouseOver={mouseOverTitle}
                    onMouseLeave={mouseLeaveTitle}
                    className={`group flex h-full w-full py-3 ${
                      contactKonten ? "animate-leftToRight" : "opacity-0"
                    }`}>
                    <span
                      className={`inline-block transform  duration-700  group-hover:-translate-x-14`}>
                      Linkedin
                    </span>
                    <div
                      onMouseOver={mouseOverLink}
                      onMouseLeave={mouseLeaveLink}
                      className="relative h-full w-full hover:text-white">
                      <div
                        className="wrapper absolute w-0 -translate-x-10 transform overflow-hidden rounded-xl bg-white mix-blend-difference transition-all duration-100 ease-linear group-hover:w-[189px]
                    group-hover:border-2 group-hover:lg:w-[146px]">
                        <div className="relative h-full w-full">
                          <span
                            className="circle"
                            style={{
                              left: localCoords.x + "px",
                              top: localCoords.y + "px",
                            }}></span>
                        </div>
                        <a
                          className="block h-full w-full group-hover:px-2"
                          href={`${userLinkedIn}`}
                          target="_blank">
                          {"@" + userLinkedIn.split("/")[4]}
                        </a>
                      </div>
                    </div>
                  </li>
                  <li
                    onMouseOver={mouseOverTitle}
                    onMouseLeave={mouseLeaveTitle}
                    className={`group flex h-full w-full py-3 ${
                      contactKonten ? "animate-leftToRight" : "opacity-0"
                    }`}>
                    <span
                      className={`inline-block transform  duration-700  group-hover:-translate-x-14`}>
                      Github
                    </span>
                    <div
                      onMouseOver={mouseOverLink}
                      onMouseLeave={mouseLeaveLink}
                      className="relative h-full w-full hover:text-white">
                      <div
                        className=" wrapper absolute w-0 -translate-x-10 transform overflow-hidden whitespace-nowrap rounded-xl bg-white mix-blend-difference transition-all duration-100 ease-linear
                    group-hover:w-[149px] group-hover:border-2 group-hover:lg:w-[120px]">
                        <div className="relative h-full w-full">
                          <span
                            className="circle"
                            style={{
                              left: localCoords.x + "px",
                              top: localCoords.y + "px",
                            }}></span>
                        </div>
                        <a
                          onMouseOver={mouseOverLink}
                          onMouseLeave={mouseLeaveLink}
                          className="block h-full w-full group-hover:px-2"
                          href={`${userGithub}`}
                          target="_blank">
                          {"@" + userGithub.split("/")[3]}
                        </a>
                      </div>
                    </div>
                  </li>
                  <li
                    onMouseOver={mouseOverTitle}
                    onMouseLeave={mouseLeaveTitle}
                    className={`group flex h-full w-full py-3 ${
                      contactKonten ? "animate-leftToRight" : "opacity-0"
                    }`}>
                    <span
                      className={`inline-block transform  duration-700  group-hover:-translate-x-14`}>
                      Youtube
                    </span>
                    <div
                      onMouseOver={mouseOverLink}
                      onMouseLeave={mouseLeaveLink}
                      className="relative h-full w-full hover:text-white">
                      <div className="wrapper absolute w-0 -translate-x-8 transform overflow-hidden whitespace-nowrap rounded-xl bg-white mix-blend-difference transition-all duration-100 ease-linear group-hover:w-[85px] group-hover:border-2 group-hover:lg:w-[65px]">
                        <div className="relative h-full w-full">
                          <span
                            className="circle"
                            style={{
                              left: localCoords.x + "px",
                              top: localCoords.y + "px",
                            }}></span>
                        </div>
                        <a
                          onMouseOver={mouseOverLink}
                          onMouseLeave={mouseLeaveLink}
                          className="block h-full w-full group-hover:px-2"
                          href={`${userYoutube}`}
                          target="_blank">
                          Ukiyo
                        </a>
                      </div>
                    </div>
                  </li>
                  <li
                    onMouseOver={mouseOverTitle}
                    onMouseLeave={mouseLeaveTitle}
                    className={`group flex h-full w-full py-3 ${
                      contactKonten ? "animate-leftToRight" : "opacity-0"
                    }`}>
                    <span
                      className={`inline-block transform  duration-700  group-hover:-translate-x-14`}>
                      Dribbble
                    </span>
                    <div
                      onMouseOver={mouseOverLink}
                      onMouseLeave={mouseLeaveLink}
                      className="relative h-full w-full hover:text-white">
                      <div className="wrapper absolute w-0 -translate-x-10 transform overflow-hidden whitespace-nowrap rounded-xl bg-white mix-blend-difference transition-all duration-100 ease-linear group-hover:w-[159px] group-hover:border-2 group-hover:lg:w-[125px]">
                        <div className="relative h-full w-full">
                          <span
                            className="circle"
                            style={{
                              left: localCoords.x + "px",
                              top: localCoords.y + "px",
                            }}></span>
                        </div>
                        <a
                          onMouseOver={mouseOverLink}
                          onMouseLeave={mouseLeaveLink}
                          className="block h-full w-full group-hover:px-2"
                          href={`${userDribbble}`}
                          target="_blank">
                          {"@" + userDribbble.split("/")[3]}
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="pt-4 md:pt-14 lg:pt-8 xl:pt-28 2xl:pt-8">
            <h1
              ref={refH1}
              className="relative overflow-hidden break-words pb-4 text-8xl font-semibold text-black/60 lg:text-9xl 2xl:text-[10.5rem] 2xl:leading-none">
              <span
                className="flow-root max-w-max "
                onMouseOver={mouseOverTitle}
                onMouseLeave={mouseLeaveTitle}>
                Muhammad
              </span>{" "}
              {/* <br /> */}
              <span
                className="flow-root max-w-max "
                onMouseOver={mouseOverTitle}
                onMouseLeave={mouseLeaveTitle}>
                Ramadhan
              </span>{" "}
              {/* <br /> */}
              <div className="relative z-0">
                <span
                  onMouseOver={mouseOverTitle}
                  onMouseLeave={mouseLeaveTitle}>
                  Sangisda
                </span>
                <span
                  onMouseOver={mouseOverTitle}
                  onMouseLeave={mouseLeaveTitle}>
                  {" "}
                  Alam
                </span>
                <Image
                  onMouseOver={mouseOverTitle}
                  onMouseLeave={mouseLeaveTitle}
                  className="inline-block w-1/4 md:w-1/6 xl:w-1/12"
                  src={emoji}
                  alt="Emoji wow"
                  ref={emojiWow}
                />
              </div>
            </h1>
            <h3
              onMouseOver={mouseOverTitle}
              onMouseLeave={mouseLeaveTitle}
              className=" subTitle w-max text-3xl font-semibold tracking-wide text-white md:text-4xl xl:text-5xl">
              Front End Developer
              <hr className="mt-2 border-2 border-white" />
            </h3>
          </div>
          <div className="flex h-full flex-col-reverse items-center justify-evenly xl:flex-row xl:justify-around">
            <div className="wrapper_more_content w-full">
              <div
                onMouseOver={mouseOverLink}
                onMouseLeave={mouseLeaveLink}
                className="more_content group relative flex w-14 items-center overflow-hidden rounded-full bg-white ring-neutral-500/40 transition-all duration-500 hover:w-48 hover:cursor-pointer hover:text-white hover:ring-8">
                <span
                  className="circle"
                  style={{
                    left: localCoords.x + "px",
                    top: localCoords.y + "px",
                  }}></span>
                <ArrowSmallRightIcon className="z-10 h-14 w-14 stroke-2 p-3.5 text-neutral-700 group-hover:text-white" />
                <p className="absolute hidden w-0 transform-gpu transition-all duration-100 ease-in-out group-hover:left-10 group-hover:mx-5 group-hover:block group-hover:w-28">
                  More Content
                </p>
              </div>
            </div>
            <div className="short_about w-full">
              <p
                onMouseOver={mouseOverTitle}
                onMouseLeave={mouseLeaveTitle}
                className="leadin-snug relative overflow-hidden whitespace-normal 
            break-words text-lg font-medium tracking-wide text-black/60 md:text-xl 
              lg:text-lg xl:text-xl 2xl:text-2xl">
                I'm a Front-ends developer based in Indonesia, West Java,
                Bekasi. I have developed many types In Front-Ends From well know
                <span className="ml-1 font-semibold text-black/70 underline">
                  E-commerce
                </span>{" "}
                ,
                <span className="font-semibold text-black/70 underline">
                  Application Geolocation
                </span>{" "}
                and{" "}
                <span className="font-semibold text-black/70 underline">
                  LMS
                </span>
                .
              </p>
            </div>
          </div>
        </main>

        <div className="blob_red absolute -left-24 bottom-0 -z-10 h-[500px] w-[500px] -translate-y-1/2 transform-gpu animate-blob rounded-full bg-red-300/40 blur-3xl "></div>
        <div className="blob_purple absolute left-1/3 top-1/4 -z-50 h-[400px] w-[400px] translate-y-1/3 translate-x-1/2 transform-gpu animate-blob rounded-full bg-purple-300/60 blur-3xl delay-300 lg:translate-x-full"></div>
        <div className="blob_yellow absolute -right-24 -bottom-24 -z-10 h-[400px] w-[450px] -translate-y-full -translate-x-full transform-gpu animate-blob rounded-full bg-yellow-200 blur-3xl delay-700"></div>
      </div>
    </div>
  );
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

{
  /* <hr className="mt-4 h-2 w-2/5 bg-white" /> */
}
{
  /* <Image
                onMouseOver={mouseOverTitle}
                onMouseLeave={mouseLeaveTitle}
                className="inline-block w-1/4 md:w-1/6 xl:w-1/12"
                src={Emoji}
                alt="Emoji wow"
              /> */
}
{
  /* Element face Emoji */
}
{
  /* <div className="relative inline-block h-auto w-40 -translate-y-32">
                <div className="wrapper_emoji flex items-start justify-center">
                  <div
                    ref={faceEmoji}
                    className="face animate-floats"
                    onMouseOver={mouseOverTitle}
                    onMouseLeave={mouseLeaveTitle}></div>
                </div>
              </div> */
}
{
  /* End Element  */
}
