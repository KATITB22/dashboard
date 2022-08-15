interface Props {
  partner: any[]
}

const Sponsor = ({partner}: Props) => {
  const getSponsorHeight = (size: string) => {
    if (size === 'S') {
      return 'h-[30px]';
    }
    if (size === 'M') {
      return 'h-[60px]';
    }
    if (size === 'L') {
      return 'h-[90px]';
    }
    if (size === 'XL') {
      return 'h-[120px]';
    }
  };

  return (
    <div className="xs:px-20 lg:px-32 xl:px-40 xxl:px-76 p-5 flex flex-wrap justify-center items-center bg-white bg-opacity-80">
      {partner.map((elmt, idx) => (
        <img
          draggable="false"
          src={elmt.src}
          alt={elmt.name}
          key={idx}
          className={`${getSponsorHeight(elmt.size)} mx-2 mt-10`}
        />
      ))}
    </div>
  );
};

export default Sponsor;