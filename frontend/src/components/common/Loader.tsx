const Loader = ({size}: {size: number}) => {
  return (
    <div style={{width: `${size}px` , height: `${size}px`}} className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader