import { useEffect, useState } from "react";

const useHeaderColor = () => {
  // Define a state variable called 'headerColor' and its initial value is 'false'.
  // 'headerColor' will be used to store the background color of the header.
  const [headerColor, setHeaderColor] = useState(false);

  // Use the 'useEffect' hook to execute code when the component using this hook mounts and unmounts.
  useEffect(() => {
    // Define a function 'handleScroll' that will be called when the user scrolls.
    function handleScroll() {
      // Check if the vertical scroll position (window.scrollY) is greater than 8 pixels.
      if (window.scrollY > 8) {
        // If the scroll position is greater than 8 pixels, set the 'headerColor' to a specific color ('#302e2e').
        // This typically represents a change in the header's appearance when scrolling.
        setHeaderColor("#302e2e");
      } else {
        // If the scroll position is less than or equal to 8 pixels, set the 'headerColor' to 'none'.
        // This likely indicates that the header should not have a background color.
        setHeaderColor("none");
      }
    }

    // Add an event listener to the 'scroll' event on the window.
    // When the user scrolls, the 'handleScroll' function will be called.
    window.addEventListener("scroll", handleScroll);

    // Return a cleanup function. This function will be executed when the component unmounts.
    // It removes the event listener to avoid memory leaks.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // The empty array '[]' means this effect runs only on mount and unmount.

  // Return the current value of 'headerColor'. This value can be used in the component
  // that utilizes this custom hook to determine the background color of the header.
  return headerColor;
};

export default useHeaderColor;
