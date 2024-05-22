/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { homeScrollIds } from "@/config/homeScrollIds";
import PAGE_SCROLL_ID from "@/config/page-scroll-id";
import { inViewContext } from "@/context/inViewContext";
import useMediaSize from "@/hooks/media-query/useMediaSize";
import { cn } from "@/lib/utils";
import {
  ArrowDownToDot,
  ArrowDownToLine,
  ArrowUpFromDot,
  ArrowUpFromLine,
} from "lucide-react";
import {
  UIEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import ScrollToSectionBtn from "./ScrollToSectionBtn";

const HEADER_HEIGHT = 126;

type ElInfoType = {
  elId: string;
  position: "up" | "down" | false;
};
const isVisibleInViewport = (element: Element) => {
  const elementStyle = getComputedStyle(element);
  //Particular cases when the element is not visible at all
  if (
    elementStyle.height == "0px" ||
    elementStyle.display == "none" ||
    elementStyle.opacity == "0" ||
    elementStyle.visibility == "hidden" ||
    elementStyle.clipPath == "circle(0px at 50% 50%)" ||
    elementStyle.transform == "scale(0)" ||
    element.hasAttribute("hidden")
  ) {
    return false;
  }

  const rect = element.getBoundingClientRect();

  //Overlapping strict check
  const baseElementLeft = rect.left;
  const baseElementTop = rect.top;

  const elementFromStartingPoint = document.elementFromPoint(
    baseElementLeft,
    baseElementTop
  );

  if (
    elementFromStartingPoint != null &&
    !element.isSameNode(elementFromStartingPoint)
  ) {
    const elementZIndex = elementStyle.zIndex;
    const elementOverlappingZIndex = getComputedStyle(
      elementFromStartingPoint
    ).zIndex;
    if (Number(elementZIndex) < Number(elementOverlappingZIndex)) {
      return false;
    }

    if (elementZIndex === "" && elementOverlappingZIndex === "") {
      /**
        		If two positioned elements overlap without a z-index specified, the element 
			positioned last in the HTML code will be shown on top 
        		**/
      if (
        element.compareDocumentPosition(elementFromStartingPoint) &
        Node.DOCUMENT_POSITION_FOLLOWING
      ) {
        return false;
      }
    }
  }

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (innerWidth || document.documentElement.clientWidth)
  );
};

const ScrollToSection = () => {
  const mediaSize = useMediaSize();
  const { inViewMap } = useContext(inViewContext);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [elements, setElements] = useState<{
    scrollContainerId: string;
    techStack: ElInfoType;
    projects: ElInfoType;
  }>({
    scrollContainerId: PAGE_SCROLL_ID,
    techStack: {
      elId: homeScrollIds.techStack,
      position: "down",
    },
    projects: {
      elId: homeScrollIds.projects,
      position: "down",
    },
  });

  const handleScrollTech = () => {
    const scrollContainer = document.getElementById(
      elements.scrollContainerId
    )!;

    const techStackElement = document
      .getElementById(elements.techStack.elId)!
      .closest(".section-element")! as HTMLElement;

    if (scrollContainer && techStackElement) {
      // check if sroll is more than techStack
      scrollContainer.scrollBy({
        top:
          techStackElement.offsetTop -
          scrollContainer.scrollTop -
          HEADER_HEIGHT,
        behavior: "smooth",
      });
    }
  };

  const handleScrollProjects = () => {
    const scrollContainer = document.getElementById(
      elements.scrollContainerId
    )!;

    const projectsElement = document
      .getElementById(elements.projects.elId)!
      .closest(".section-element")! as HTMLElement;

    if (scrollContainer && projectsElement) {
      // check if sroll is more than projects
      scrollContainer.scrollBy({
        top:
          projectsElement.offsetTop - scrollContainer.scrollTop - HEADER_HEIGHT,
        behavior: "smooth",
      });
    }
  };

  useLayoutEffect(() => {
    if (window) {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (window && isClient) {
      const scrollContainer = document.getElementById(
        elements.scrollContainerId
      )!;

      const handleScroll = (e?: Event) => {
        const techStackElement = document
          .getElementById(elements.techStack.elId)!
          .closest(".section-element")! as HTMLElement;

        const projectsElement = document
          .getElementById(elements.projects.elId)!
          .closest(".section-element")! as HTMLElement;

        let techPosition = elements.techStack.position;
        let projectPosition = elements.projects.position;

        if (!inViewMap.get(homeScrollIds.techStack)) {
          const isUp = techStackElement.getBoundingClientRect().top < 0;
          techPosition = isUp ? "up" : "down";
        } else {
          techPosition = false;
        }

        if (!inViewMap.get(homeScrollIds.projects)) {
          const isUp = projectsElement.getBoundingClientRect().top < 0;
          projectPosition = isUp ? "up" : "down";
        } else {
          projectPosition = false;
        }

        setElements((prev) => ({
          ...prev,
          techStack: {
            ...prev.techStack,
            position: techPosition,
          },
          projects: {
            ...prev.projects,
            position: projectPosition,
          },
        }));
      };

      handleScroll();

      scrollContainer.addEventListener("scroll", handleScroll);

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isClient, inViewMap]);

  return (
    <div className="flex items-center gap-1 fixed bottom-3 left-4 md:left-1/2 md:-translate-x-1/2 z-30">
      <ScrollToSectionBtn
        cb={handleScrollTech}
        text={"Tech Stack"}
        position={elements.techStack.position}
        mediaSize={mediaSize}
      />
      <ScrollToSectionBtn
        cb={handleScrollProjects}
        text={"Projects"}
        position={elements.projects.position}
        mediaSize={mediaSize}
      />
    </div>
  );
};
export default ScrollToSection;
