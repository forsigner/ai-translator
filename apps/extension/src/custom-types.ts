import { BoneUINode } from './common/fomir-bone-ui'

type CustomNode = BoneUINode

declare module 'fomir' {
  interface CustomTypes {
    Node: CustomNode & { updatable?: boolean }
    // | {
    //     component: CustomNode['component'] | ({} & string)
    //     [key: string]: any
    //   }
  }
  interface Validators {
    moreThan?: [string, string]
  }
}
