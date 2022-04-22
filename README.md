# use-segment-analytics

## How to use
1. Wrap your component tree with the Segment Provider. Remember to include your Segment API key (Write Key).
```
import { SegmentProvider } from 'use-segment-analytics';

const App = () => (
  <SegmentProvider apiKey={YOUR_API_KEY_HERE}>
    <Component />
  </SegmentProvider>
);
```

2. From anywhere within this tree, use our provided hook.
```
import { useSegmentTracking } from 'use-segment-analytics';

const Component = () => {
  const tracking = useSegmentTracking();
  
  useEffect(() => {
    tracking.track('track event!', { ...properties })
  }, [tracking])
  
  return (
    ...children
  );
}
```
