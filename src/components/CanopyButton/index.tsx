import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { CircleCheckBig, LoaderCircle } from 'lucide-react';
import Script from 'next/script';
import LoadingSpinner from '../LoadingSpinner';

type CanopyButtonProps = {
  className: string;
  isDisabled: boolean;
  isConnected: boolean;
  setConnected: Dispatch<SetStateAction<boolean>>;
  onConnectionSuccess: (p: string) => void;
  failureToast: (title: string, description: string) => {
    id: string;
    dismiss: () => void;
    update: (props) => void;
  }
}

const CanopyButton: FC<CanopyButtonProps> = (props) => {
  const {
    className,
    isDisabled,
    isConnected,
    setConnected,
    onConnectionSuccess,
    failureToast
  } = props
  
  const [isLoading, setLoading] = useState(true)

  const onLoad = () => {
    setLoading(false)
  } 

  // const CanopyConnectBtn = ({ publicAlias, consentToken, metaData }) => {
    const CanopyConnectBtn = ({ publicAlias }) => {
      const [handler, setHandler] = useState(null);
      useEffect(() => {
        if (!publicAlias) {
          return; // Don't do anything - will keep showing the loading spinner until a publicAlias is set
        }
  
        // @ts-ignore
        const canopyHandler = CanopyConnect.create({
          publicAlias,
          // consentToken,
          // pullMetaData: metaData,
        });
        setHandler(canopyHandler);
        canopyHandler.on('authenticationSuccess', (data) => {
          onConnectionSuccess(data.pull.pull_id)
          setConnected(true)
        })
        canopyHandler.on('authenticationFailure', (data) => {
          failureToast("Oh no! There was an issue getting your insurance information", "")
        })
        return () => {
          setHandler(null);
          canopyHandler.destroy();
        };
      }, [publicAlias]); // Reload SDK when props change
      // }, [publicAlias, consentToken, metaData]); // Reload SDK when props change
    
      return (
        <Button
          className={className}
          onClick={() => handler.open()}
          disabled={isDisabled || isConnected}
        >
          {!handler && (
            <LoaderCircle
              className="mr-3 h-5 w-5 animate-spin"
            />
          )}
          {isConnected ? (
            <>
              <CircleCheckBig 
                className="mr-3 h-5 w-5"
              />
              Connected
            </>
          ) : "Connect with Canopy"}
        </Button>
      );
    };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <CanopyConnectBtn publicAlias={"hometrek"} />
      )}
      <Script
        src="https://cdn.usecanopy.com/v2/canopy-connect.js"
        onLoad={onLoad}
      />
    </>
    
  )
}

export default CanopyButton