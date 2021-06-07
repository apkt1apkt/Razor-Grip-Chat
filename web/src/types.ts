import { SvgIconComponent } from "@material-ui/icons";

declare global {
  type Nullable<T> = T | null | undefined;

  type Obj<T = any> = { [x: string]: T };

  type QueryResult<accessor extends string, T> = Data.O<{ readonly [P in accessor]: T }>;

  namespace Web {
    type Icon = SvgIconComponent;
  }

  namespace Data {
    type O<T> = T extends _DoNotTransform ? Nullable<T> : { [P in keyof T]?: O<T[P]> | null };
  }
}

type _DoNotTransform = Date | File | Blob;
