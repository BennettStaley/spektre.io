import { wrapPage } from '../enhancers/wrapPage';
import { Typography, Card, Fade } from '@material-ui/core';
import { useTypeWritter } from '../hooks/useTypewriter';

const discord = () => {
  const typeWriter = useTypeWritter('Join the Discord Below!');

  return (
    <>
      <Typography variant="h2" align="center" color="secondary">
        {typeWriter}
      </Typography>
      <Fade in timeout={6000}>
        <Card
          elevation={5}
          css={`
            margin: 0 auto !important;
            border-radius: 5px !important;
            width: 350px !important;
            display: flex !important;
            justify-content: center !important;
            align-items: cetner !important;
            margin-bottom: -1px !important;
          `}
        >
          <iframe
            src="https://discordapp.com/widget?id=388169750997630980&theme=dark"
            width="350"
            height="500"
            // allowtransparency="true"
            frameBorder="0"
          ></iframe>
        </Card>
      </Fade>
    </>
  );
};

export default wrapPage(discord, {
  appLayout: {
    showFooter: false,
    showNavigation: false,
  },
});
