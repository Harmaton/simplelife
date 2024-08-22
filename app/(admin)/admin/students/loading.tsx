
import { BounceLoader } from "react-spinners";

export default function loading() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center max-w-7xl mx-auto'>
      <BounceLoader color="#A020F0" />
    </div>
  );
}
