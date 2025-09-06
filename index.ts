import { monitor } from './monitor-mmt-range';

monitor().catch((err) => {
  console.error('monitoring terminated with error:', err);
  process.exit(1);
});
