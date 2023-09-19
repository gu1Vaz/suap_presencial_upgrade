import React, { useEffect, useRef } from 'react';

export const Iframe = (props)=>{
  const iframeRef = useRef(null);

  useEffect(() => {
    const setCookieInIframe = () => {
      if (iframeRef.current) {
        const iframeDocument = iframeRef.current.contentDocument;
        iframeDocument.cookie = "nomeCookie=valorCookie; SameSite=None; Secure";
      }
    };
    setCookieInIframe();
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Meu Iframe"
      width="500"
      height="300"
      src={props.url}
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
}