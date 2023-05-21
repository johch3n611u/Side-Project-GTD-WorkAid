import { EnumComponentType } from '../../../../shared/enum/enum-component-type';
export class BaseComponent {

  _EnumComponentType = EnumComponentType;

  // 用來引用共用 Enum 或將必要的 Service 在這注入強迫繼承者注入，或在這寫共用方式。
  constructor() { }

}
