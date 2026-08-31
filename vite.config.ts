import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          programmes: path.resolve(__dirname, 'programmes-and-services.html'),
          healthWellness: path.resolve(__dirname, 'health-wellness-wellbeing-hour.html'),
          echoesOfUs: path.resolve(__dirname, 'echoes-of-us.html'),
          caringWithConfidence: path.resolve(__dirname, 'caring-with-confidence.html'),
          campaignInABox: path.resolve(__dirname, 'campaign-in-a-box.html'),
          blackHealthAwareness: path.resolve(__dirname, 'black-health-awareness-campaigns.html'),
          documentary: path.resolve(__dirname, 'documentary-storytelling.html'),
          watchAndListen: path.resolve(__dirname, 'watch-and-listen.html'),
          ourWork: path.resolve(__dirname, 'our-work.html'),
          insights: path.resolve(__dirname, 'insights.html'),
          workWithUs: path.resolve(__dirname, 'work-with-us.html'),
          terms: path.resolve(__dirname, 'terms.html'),
          privacy: path.resolve(__dirname, 'privacy.html'),
          refunds: path.resolve(__dirname, 'refunds.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
