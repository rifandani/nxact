import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from 'libs/ui/src/lib/atoms/Avatar/Avatar';
import renderer from 'react-test-renderer';

describe('Avatar component', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Avatar>
          <AvatarImage
            src="https://github.com/rifandani.png"
            alt="@rifandani"
          />
          <AvatarFallback>RR</AvatarFallback>
        </Avatar>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render fallback if no image component provided', () => {
    const tree = renderer
      .create(
        <Avatar>
          <Avatar>RR</Avatar>
        </Avatar>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
