const Icon = (props) => {

  let classNames = "c-icon";
  if (props.className) {
    classNames += " " + props.className;
  }



  return (
    <img
      className={classNames}
      src={"/icons/" + props.name + ".svg"}
      alt={"icon-"+props.name} />
  );
};

export default Icon;