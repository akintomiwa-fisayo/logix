import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SlideItem from './SlideItem';

class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: props.start,
      items: [
        ...props.items,
      ],
      hide: false,
    };

    this.moveSlide = this.moveSlide.bind(this);
  }

  moveSlide(dir) {
    const { state } = this;
    let next = 0;
    if (dir === 'left') {
      next = state.focused === 0 ? state.items.length - 1 : state.focused - 1;
    } else if (dir === 'right') {
      next = state.focused === state.items.length - 1 ? 0 : state.focused + 1;
    }

    this.setState(() => ({ focused: next }));
  }

  render() {
    const { state, props } = this;
    const { header } = props.settings;
    const items = [];
    const indicators = [];

    state.items.forEach((item, i) => {
      items.push(
        <SlideItem
          {...props}
          item={item}
          active={state.focused === i}
        />,
      );
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      indicators.push(<li
        className={`${state.focused === i ? 'active' : ''}`}
        key={`${i}_indicator`}
        onClick={() => {
          this.setState(() => ({ focused: i }));
        }}
      />);
    });

    return (
      <div data-slideshow style={{ paddingTop: header.height }}>
        <div className="screen-container">
          <span className="icon icon-cross" onClick={props.onClose} />
          <div className="controller left">
            <span
              className="icon icon-chevron-left"
              onClick={() => {
                this.moveSlide('left');
              }}
            />
          </div>
          <div className="screen">
            <div className="items" style={{ transform: `translate(-${state.focused}00%, 0)` }}>
              {items}
            </div>
            <ul className="indicators">{indicators} </ul>
          </div>
          <div className="controller right">
            <span
              className="icon icon-chevron-right"
              onClick={() => {
                this.moveSlide('right');
              }}
            />
          </div>

        </div>
      </div>

    );
  }
}

SlideShow.propTypes = {
  items: PropTypes.array.isRequired,
  start: PropTypes.number,
};

SlideShow.defaultProps = {
  start: 0,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});
export default connect(mapStateToProps)(SlideShow);
