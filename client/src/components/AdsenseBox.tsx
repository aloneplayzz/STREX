import { useEffect } from "react";

export default function AdsenseBox() {
  useEffect(() => {
    try {
      // @ts-ignore
      window.adsbygoogle = window.adsbygoogle || [];
      // @ts-ignore
      window.adsbygoogle.push({});
    } catch (e) {
      // ignore errors for environments without ads
    }
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <ins className="adsbygoogle"
           style={{ display: "block" }}
           data-ad-client="ca-pub-8002288957348274"
           data-ad-slot="8542158749"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
