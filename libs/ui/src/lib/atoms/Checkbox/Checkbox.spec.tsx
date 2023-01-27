import { Checkbox } from 'libs/ui/src/lib/atoms/Checkbox/Checkbox';
import renderer from 'react-test-renderer';

describe('Checkbox component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Checkbox />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when component is disabled', () => {
    const tree = renderer.create(<Checkbox disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when used alongside some label', () => {
    const tree = renderer
      .create(
        <section className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </section>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
