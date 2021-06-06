import Layout from '../../components/Layout';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

export const Error404 = () => {
  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '100%',
        }}
      >
        <div style={{}}>
          <EmojiObjectsIcon
            style={{
              minWidth: '10rem',
              minHeight: '10rem',
              maxWidth: '10rem',
              maxHeight: '10rem',
            }}
            color="secondary"
          />
          <h2>Brak danej strony</h2>
        </div>
      </div>
    </Layout>
  );
};
