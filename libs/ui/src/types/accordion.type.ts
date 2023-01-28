import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../lib/molecules/Collapsible/Collapsible';
import { ComponentPropsWithoutRef, Primitives } from './primitive.type';

type Direction = 'ltr' | 'rtl';
type PrimitiveDivProps = ComponentPropsWithoutRef<Primitives['div']>;
interface AccordionImplProps extends PrimitiveDivProps {
  /**
   * Whether or not an accordion is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * The layout in which the Accordion operates.
   * @default vertical
   */
  orientation?: React.AriaAttributes['aria-orientation'];
  /**
   * The language read direction.
   */
  dir?: Direction;
}
interface AccordionImplSingleProps extends AccordionImplProps {
  /**
   * The controlled stateful value of the accordion item whose content is expanded.
   */
  value?: string;
  /**
   * The value of the item whose content is expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string;
  /**
   * The callback that fires when the state of the accordion changes.
   */
  onValueChange?(value: string): void;
  /**
   * Whether an accordion item can be collapsed after it has been opened.
   * @default false
   */
  collapsible?: boolean;
}
interface AccordionImplMultipleProps extends AccordionImplProps {
  /**
   * The controlled stateful value of the accordion items whose contents are expanded.
   */
  value?: string[];
  /**
   * The value of the items whose contents are expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string[];
  /**
   * The callback that fires when the state of the accordion changes.
   */
  onValueChange?(value: string[]): void;
}
export interface AccordionSingleProps extends AccordionImplSingleProps {
  type: 'single';
}
export interface AccordionMultipleProps extends AccordionImplMultipleProps {
  type: 'multiple';
}
type CollapsibleProps = ComponentPropsWithoutRef<typeof Collapsible>;
type CollapsibleTriggerProps = ComponentPropsWithoutRef<
  typeof CollapsibleTrigger
>;
type CollapsibleContentProps = ComponentPropsWithoutRef<
  typeof CollapsibleContent
>;

export interface AccordionItemProps
  extends Omit<CollapsibleProps, 'open' | 'defaultOpen' | 'onOpenChange'> {
  /**
   * Whether or not an accordion item is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * A string value for the accordion item. All items within an accordion should use a unique value.
   */
  value: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AccordionTriggerProps extends CollapsibleTriggerProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AccordionContentProps extends CollapsibleContentProps {}
