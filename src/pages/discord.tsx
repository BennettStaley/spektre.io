/*
css={`
            margin: 0 auto !important;
            border-radius: 5px !important;
            width: 350px !important;
            display: flex !important;
            justify-content: center !important;
            align-items: cetner !important;
            margin-bottom: -1px !important;
          `}*/
const discord = () => {
  return (
    <>
      <div>Join the Discord Below!</div>
      <div>
        <iframe
          src="https://discordapp.com/widget?id=388169750997630980&theme=dark"
          width="350"
          height="500"
          // allowtransparency="true"
          frameBorder="0"
        ></iframe>
      </div>
    </>
  );
};

export default discord;
