import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';

class SlideItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLabel: false,
    };

    this.label = null;
    this.prevActiveState = false;
    this.slideItem = null;
  }

  componentDidUpdate() {
    const { props } = this;
    if (this.slideItem && props.active !== this.prevActiveState) {
      this.prevActiveState = props.active;
      if (props.active) {
        this.slideItem.play();
      } else this.slideItem.pause();
    }
  }

  render() {
    const { state, props } = this;
    const { item } = props;

    const labelTop = state.showLabel ? `calc(100% - ${$(this.label).outerHeight()}px)` : '';
    return (
      <div className="item">
        <div className={`content ${item.type}`}>
          { item.type === 'video' ? (
            <video
              controls
              className="item-preview"
              src={item.content}
              alt=""
              ref={(e) => { this.slideItem = e; }}
            />
          ) : (
            <audio
              controls
              className="item-preview"
              src={item.content}
              alt=""
              ref={(e) => { this.slideItem = e; }}
            />
          )}
        </div>
        <div
          className="label"
          ref={(e) => { this.label = e; }}
          style={{ top: labelTop }}
          onMouseEnter={() => {
            this.setState({ showLabel: true });
          }}
          onMouseLeave={() => {
            this.setState({ showLabel: false });
          }}
        >{item.label}
        </div>
      </div>
    );
  }
}

SlideItem.propTypes = {
  items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});
export default connect(mapStateToProps)(SlideItem);
