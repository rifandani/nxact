import renderer from 'react-test-renderer';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './Collapsible';

describe('Button regular component', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Collapsible>
          <CollapsibleTrigger>Triggerer</CollapsibleTrigger>
          <CollapsibleContent>Collapsible Content</CollapsibleContent>
        </Collapsible>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
