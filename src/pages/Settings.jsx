import { Dialog } from "../components/Dialog";
import { data } from "../data";

export const Settings = () => {
  return (
   <>
    <Dialog task={data.settings}/>
   </>
  );
};
