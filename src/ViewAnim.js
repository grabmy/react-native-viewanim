
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import SimpleTween from 'react-native-simple-tween';

class ViewAnim extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            values: {
                x: props.from.x || 0,
                y: props.from.y || 0,
                scale: props.from.scale || 1,
                rotate: props.from.rotate || 0,
                opacity: props.from.opacity || 1,
                backgroundColor: props.from.backgroundColor || undefined,
            },
            from: props.from,
            to: props.to,
        };

        this.updateValues = this.updateValues.bind(this);

        this.tween = new SimpleTween(this.state.values, props.to, props.duration)
            .setUpdateTime(props.frameDelay)
            .setCycle(props.cycle)
            .setDelay(props.delay)
            .setEasing(props.easing)
            .setResetOnStart(props.resetOnStart)
            .setResetOnEnd(props.resetOnEnd)
            .setRepeat(props.repeat)
            .onStart(props.onStart)
            .onEnd(props.onEnd)
            .onUpdate(this.updateValues);

        if (this.props.trigger == 'start' && this.props.repeat)
        {
            setTimeout(() => {
                this.tween.start();
            }, 0);
        }
    }

    updateValues(values) {
        this.setState({values});
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.easing !== this.props.easing) {
            this.tween.setEasing(this.props.easing).stop().to(this.props.to);
        }
        if (prevProps.repeat !== this.props.repeat) {
            this.tween.setRepeat(this.props.repeat).stop().to(this.props.to);
        }
        if (prevProps.duration !== this.props.duration) {
            this.tween.setDuration(this.props.duration).stop().to(this.props.to);
        }
        if (prevProps.to.x !== undefined && prevProps.to.x !== this.props.to.x
            || prevProps.to.y !== undefined && prevProps.to.y !== this.props.to.y
            || prevProps.to.rotate !== undefined && prevProps.to.rotate !== this.props.to.rotate
            || prevProps.to.opacity !== undefined && prevProps.to.opacity !== this.props.to.opacity
            || prevProps.to.scale !== undefined && prevProps.to.scale !== this.props.to.scale
            || prevProps.to.backgroundColor !== undefined && prevProps.to.backgroundColor !== this.props.to.backgroundColor
            )
        {
            this.tween.to(this.props.to, this.props.duration);
        } else if (prevProps.toggle !== this.props.toggle) {
            this.tween.start();
        }
    }


    componentWillUnmount()
    {
        this.tween.stop();
    }


    render()
    {
        const styles = {
            transform:[
                {translateX: this.state.values.x},
                {translateY: this.state.values.y},
                {scale: this.state.values.scale},
                {rotate: this.state.values.rotate + 'deg'},
            ],
            opacity: this.state.values.opacity,
            backgroundColor: this.state.values.backgroundColor,
        };

        return <View style={[styles, this.props.style]}>{this.props.children}</View>;
    }
}

ViewAnim.Easing = SimpleTween.Easing;

ViewAnim.propTypes = {
    style: PropTypes.object,
    from: PropTypes.object,
    to: PropTypes.object,
    repeat: PropTypes.number,
    duration: PropTypes.number,
    delay: PropTypes.number,
    cycle: PropTypes.bool,
    frameDelay: PropTypes.number,
    easing: PropTypes.func,
    onStart: PropTypes.func,
    onEnd: PropTypes.func,
    trigger: PropTypes.string,
    toggle: PropTypes.bool,
    resetOnStart: PropTypes.bool,
    resetOnEnd: PropTypes.bool,
};

ViewAnim.defaultProps = {
    style: {},
    from: {},
    to: {},
    repeat: 1,
    cycle: false,
    duration: 1000,
    delay: 0,
    frameDelay: 16,
    easing: SimpleTween.Easing.Cubic.InOut,
    onStart: () => {},
    onEnd: () => {},
    trigger: "start",
    toggle: false,
    resetOnStart: true,
    resetOnStop: false,
};

export default ViewAnim;
