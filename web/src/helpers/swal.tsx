import swal from "@sweetalert/with-react";

import CircularProgress from "@material-ui/core/CircularProgress";

import { waitFor } from "@web/helpers/simple";
import { explainErr } from "@web/helpers/apollo";

export const confirmMutateSwal = async (options: confirmMutateSwalOptions) => {
  try {
    const confirm = await swal({
      icon: options.confirmIcon ?? "info",
      title: options.confirmTitle ?? "Do you wish to proceed?",
      text: options.confirmText,
      buttons: options.confirmButtons || ["No", "Yes"],
      closeOnClickOutside: false,
      closeOnEsc: false,
      dangerMode: options.isDangerous,
    });
    if (confirm) {
      swal(<CircularProgress size={50} />, {
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: false,
      });
      const minWait = waitFor(500);
      await options.func();
      await minWait;
      swal({
        icon: "success",
        text: options.successText,
        title: options.successTitle ?? "Completed successfully",
      });
      if (options.onSuccess) await options.onSuccess();
    }
  } catch (e) {
    swal({
      icon: "error",
      dangerMode: true,
      title: "Error",
      closeOnClickOutside: false,
      closeOnEsc: false,
      text: explainErr(e)?.message,
    });
  }
};

type confirmMutateSwalOptions = {
  confirmTitle?: string | null;
  confirmText?: React.ReactNode;
  successText?: string;
  successTitle?: string;
  func: () => any;
  onSuccess?: () => any;
  confirmIcon?: "info" | "warning";
  confirmButtons?: [string, string];
  isDangerous?: boolean;
};
