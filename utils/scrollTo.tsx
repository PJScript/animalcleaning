const scrollTo = (window:any, ref:any) => {
    window.scroll({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  }

  export default scrollTo