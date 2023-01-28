import { Button } from 'libs/ui/src/lib/atoms/Button/Button';
import { Size } from 'libs/ui/src/types/button.type';
import renderer from 'react-test-renderer';

describe('Button regular component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Button>Button Text</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render correctly when there's no child component", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with text child and type', () => {
    const tree = renderer
      .create(<Button type="submit">Button Text</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when component is disabled', () => {
    const tree = renderer
      .create(<Button disabled>Button Text</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be able to fire onClick event', () => {
    const onClick = jest.fn();
    const tree = renderer.create(<Button onClick={onClick} />);
    tree.root.props.onClick();
    expect(onClick).toHaveBeenCalled();
  });

  it('should render correctly with small prop', () => {
    const tree = renderer
      .create(<Button size={Size.small}>Button Text</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with no rounded prop', () => {
    const tree = renderer.create(<Button>Button Text</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button Outlined component', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<Button buttonType="outlined">Button Text</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render correctly when there's no child component", () => {
    const tree = renderer.create(<Button buttonType="outlined" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with text child and type', () => {
    const tree = renderer
      .create(
        <Button buttonType="outlined" type="submit">
          Button Text
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when component is disabled', () => {
    const tree = renderer
      .create(
        <Button buttonType="outlined" disabled>
          Button Text
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be able to fire onClick event', () => {
    const onClick = jest.fn();
    const tree = renderer.create(
      <Button buttonType="outlined" onClick={onClick} />
    );
    tree.root.props.onClick();
    expect(onClick).toHaveBeenCalled();
  });

  it('should render correctly with small prop', () => {
    const tree = renderer
      .create(
        <Button buttonType="outlined" size={Size.small}>
          Button Text
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with no rounded prop', () => {
    const tree = renderer
      .create(<Button buttonType="outlined">Button Text</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button Text component', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<Button buttonType="outlined">Button Text</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render correctly when there's no child component", () => {
    const tree = renderer.create(<Button buttonType="text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with text child and type', () => {
    const tree = renderer
      .create(
        <Button buttonType="text" type="submit">
          Button Text
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when component is disabled', () => {
    const tree = renderer
      .create(
        <Button buttonType="text" disabled>
          Button Text
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be able to fire onClick event', () => {
    const onClick = jest.fn();
    const tree = renderer.create(
      <Button buttonType="text" onClick={onClick} />
    );
    tree.root.props.onClick();
    expect(onClick).toHaveBeenCalled();
  });

  it('should render correctly with small prop', () => {
    const tree = renderer
      .create(
        <Button buttonType="text" size={Size.small}>
          Button Text
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
