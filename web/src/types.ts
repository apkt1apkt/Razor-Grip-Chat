import { SvgIconComponent } from "@material-ui/icons";

declare global {
  namespace Web {
    type Icon = SvgIconComponent;
  }
}
