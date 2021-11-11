
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
        
        if (this.props.chain.length > 0)
        {
            // Not implemented yet
            // this.tween.chain(this.props.chain);
        }
        
        if (this.props.trigger === 'start' || this.props.trigger === 'toggle' && this.props.toggle)
        {
            this.tween.start();
        }
    }

    updateValues(values) {
        this.setState({values});
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.easing !== this.props.easing) {
            this.tween.setEasing(this.props.easing).start();
        }
        if (prevProps.repeat !== this.props.repeat) {
            this.tween.setRepeat(this.props.repeat).start();
        }
        if (prevProps.duration !== this.props.duration) {
            this.tween.setDuration(this.props.duration).start();
        }
        if (prevProps.delay !== this.props.delay) {
            this.tween.setDelay(this.props.delay).start();
        }
        if (prevProps.cycle !== this.props.cycle) {
            this.tween.setCycle(this.props.cycle).start();
        }
        if (prevProps.frameDelay !== this.props.frameDelay) {
            this.tween.setUpdateTime(this.props.frameDelay).start();
        }
        if (prevProps.resetOnStart !== this.props.resetOnStart) {
            this.tween.setResetOnStart(this.props.resetOnStart);
        }
        if (prevProps.resetOnEnd !== this.props.resetOnEnd) {
            this.tween.setResetOnEnd(this.props.resetOnEnd);
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
        } else if (this.props.trigger == 'toggle' && prevProps.toggle !== this.props.toggle) {
            if (this.props.toggle) {
                this.tween.forward().start();
            } else {
                this.tween.backward().start();
            }
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
    chain: PropTypes.arrayOf(PropTypes.shape({
        from: React.PropTypes.object,
        to: PropTypes.object,
        repeat: PropTypes.number,
        duration: PropTypes.number,
        delay: PropTypes.number,
        cycle: PropTypes.bool,
        easing: PropTypes.func,
   })),
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
    chain: [],
};

export default ViewAnim;
