import { FC, useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';

type CanopyButtonProps = {
  className: string;
}

const CanopyButton: FC<CanopyButtonProps> = ({ className }) => {
  const [isConnecting, setConnectingStatus] = useState<boolean> (false);
  return (
    <Button
      className={className}
      onClick={() => {
        setConnectingStatus(true)
        // open()
      }}
      disabled={isConnecting}
      >
      {isConnecting && (
        <LoaderCircle
          className="mr-3 h-5 w-5 animate-spin"
        />
      )}
      Connect with Canopy Connect
    </Button>
  )
}

export default CanopyButton