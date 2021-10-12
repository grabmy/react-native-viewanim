
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Easing from './Easing';

class ViewAnim extends React.Component {

    constructor(props) {
        super(props);

        this.animProcess = this.animProcess.bind(this);

        //this.frameDelay = 16.666;
        this.timeoutId = 0;

        this.state = {
            position: {
                x: props.from.x || 0,
                y: props.from.y || 0,
                scale: props.from.scale || 1,
                rotate: props.from.rotate || 0,
                opacity: props.from.opacity || 1,
                backgroundColor: props.from.backgroundColor || undefined,
            },
            from: this.props.from,
            to: this.props.to,
            repeat: this.props.repeat ? this.props.repeat-1 : 0,
        };

        if (this.props.trigger == 'start' && this.props.repeat)
        {
            setTimeout(() => {
                this.animStart();
            }, 0);
        }
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.trigger == 'toggle' && this.props.toggle != prevProps.toggle)
        {
            if (prevProps.toggle || prevProps.cycle == false)
            {
                this.forward();
            } else {
                this.backward();
            }
            setTimeout(() => {
                this.animStart();
            }, 0);
        } else
        {
            if (!this.state.isPlaying)
            {
                if (prevProps.to.x !== undefined && prevProps.to.x !== this.props.to.x
                    || prevProps.to.y !== undefined && prevProps.to.y !== this.props.to.y
                    || prevProps.to.rotate !== undefined && prevProps.to.rotate !== this.props.to.rotate
                    || prevProps.to.opacity !== undefined && prevProps.to.opacity !== this.props.to.opacity
                    || prevProps.to.scale !== undefined && prevProps.to.scale !== this.props.to.scale
                    )
                {
                    this.forward();
                    setTimeout(() => {
                        this.animStart();
                    }, 0);
                }
            }
    
        }

        return true;
    }

    rgb2hex(colorArray) {
        var color = [];
        for (var i = 0; i < colorArray.length; i++) {
            var hex = colorArray[i].toString(16);
            if (hex.length < 2) { hex = "0" + hex; }
            color.push(hex);
        }
        return "#" + color.join("");
    }

    getDateTime()
    {
        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }

        const now = new Date();
        const strDateTime = [[AddZero(now.getDate()),
            AddZero(now.getMonth() + 1),
            now.getFullYear()].join("/"),
            [AddZero(now.getHours()),
            AddZero(now.getMinutes()),
            AddZero(now.getSeconds())].join(":"),
            now.getHours() >= 12 ? "PM" : "AM"].join(" ");
        
        return strDateTime;
    }

    componentWillUnmount()
    {
        //console.log(this.getDateTime() + ' :: componentWillUnmount :: animStop');
        this.animStop();
    }

    animStart()
    {
        //console.log(this.getDateTime() + ' :: animStart :: Begin');
        if (this.timeoutId)
        {
            //console.log(this.getDateTime() + ' :: animStart :: Clear timeout');
            clearTimeout(this.timeoutId);
        }

        //console.log(this.getDateTime() + ' :: animStart :: Set state');
        this.setState({
            anim: {
                start: Date.now() + this.props.delay,
                end: Date.now() + this.props.delay + this.props.duration,
            },
            isPlaying: true,
        });
        //console.log(this.getDateTime() + ' :: animStart :: State', this.state);

        //console.log(this.getDateTime() + ' :: animStart :: Call setTimeout');
        this.timeoutId = setTimeout(() => {
            //console.log('animStart :: Start anim process in setTimeout');
            this.animProcess();
        }, this.props.frameDelay);
        //console.log(this.getDateTime() + ' :: animStart :: End');
    }

    animProcess()
    {
        if (Date.now() < this.state.anim.start)
        {
            return;
        }

        let linearProgress = Date.now() < this.state.anim.end ? 1 - (this.state.anim.end - Date.now()) / (this.state.anim.end - this.state.anim.start) : 1;
        if (linearProgress <= 0)
        {
            linearProgress = 0;
        } else if (linearProgress > 1)
        {
            linearProgress = 1;
        }

        let progress = linearProgress;
        if (this.props.easing)
        {
            progress = this.props.easing(progress);
        }

        if (Date.now() < this.state.anim.end)
        {
            this.timeoutId = setTimeout(() => {
                this.animProcess();
            }, this.props.frameDelay);
        } else
        {
            //console.log(this.getDateTime() + ' :: animProcess :: now > end', progress);
        }

        const position = this.state.position;
        if (this.state.from.x != undefined && this.state.to.x != undefined)
        {
            position.x = this.state.from.x + (this.state.to.x - this.state.from.x) * progress;
        }
        if (this.state.from.y != undefined && this.state.to.y != undefined)
        {
            position.y = this.state.from.y + (this.state.to.y - this.state.from.y) * progress;
        }
        if (this.state.from.scale != undefined && this.state.to.scale != undefined)
        {
            position.scale = this.state.from.scale + (this.state.to.scale - this.state.from.scale) * progress;
        }
        if (this.state.from.opacity != undefined && this.state.to.opacity != undefined)
        {
            position.opacity = this.state.from.opacity + (this.state.to.opacity - this.state.from.opacity) * progress;
        }
        if (this.state.from.rotate != undefined && this.state.to.rotate != undefined)
        {
            position.rotate = this.state.from.rotate + (this.state.to.rotate - this.state.from.rotate) * progress;
        }
        this.setState({position});

        if (linearProgress >= 1)
        {
            console.log(this.getDateTime() + ' :: animProcess :: linearProgress >= 1', linearProgress);
            this.animStop();
            this.timeoutId = setTimeout(() => {
                this.animProcess();
            }, this.props.frameDelay);

            if (this.state.to.x != undefined)
            {
                position.x = this.state.to.x;
            }
            if (this.state.to.y != undefined)
            {
                position.y = this.state.to.y;
            }
            if (this.state.to.rotate != undefined)
            {
                position.rotate = this.state.to.rotate;
            }
            if (this.state.to.opacity != undefined)
            {
                position.opacity = this.state.to.opacity;
            }
            if (this.state.to.scale != undefined)
            {
                position.scale = this.state.to.scale;
            }
            if (this.state.repeat !== 0)
            {
                this.setState({repeat: this.state.repeat - 1});
                if (this.state.repeat == 1)
                {
                    return;
                }

                if (this.props.cycle)
                {
                    this.reverse();
                }
                //console.log(this.getDateTime() + ' :: animProcess :: animStart');
                this.animStart();
            } else
            {
                //console.log(this.getDateTime() + ' :: animProcess :: animStop');
                this.animStop();
            }
        }
    }

    reverse()
    {
        this.setState({
            from: this.state.to,
            to: this.state.from,
        });
    }

    forward()
    {
        if (this.props.resetOnStart)
        {
            this.setState({
                from: this.props.from,
                to: this.props.to,
            });
        } else
        {
            this.setState({
                from: {
                    x: this.state.position.x,
                    y: this.state.position.y,
                    scale: this.state.position.scale,
                    opacity: this.state.position.opacity,
                    rotate: this.state.position.rotate,
                },
                to: this.props.to,
            });
        }
    }

    backward()
    {
        if (this.props.resetOnStart)
        {
            this.setState({
                from: this.props.to,
                to: this.props.from,
            });
        } else
        {
            this.setState({
                from: {
                    x: this.state.position.x,
                    y: this.state.position.y,
                    scale: this.state.position.scale,
                    opacity: this.state.position.opacity,
                    rotate: this.state.position.rotate,
                },
                to: this.props.from,
            });
        }
    }

    animStop()
    {
        this.setState({
            isPlaying: false,
        });

        if (this.timeoutId)
        {
            clearTimeout(this.timeoutId);
        }
    }

    render()
    {
        const styles = {
            transform:[
                {translateX: this.state.position.x},
                {translateY: this.state.position.y},
                {scale: this.state.position.scale},
                {rotate: this.state.position.rotate + 'deg'},
            ],
            opacity: this.state.position.opacity
        };

        return <View style={[styles, this.props.style]}>{this.props.children}</View>;
    }
}

ViewAnim.Easing = Easing;

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
};

ViewAnim.defaultProps = {
    style: {},
    from: {},
    to: {},
    repeat: 1,
    cycle: false,
    duration: 500,
    delay: 0,
    frameDelay: 16,
    easing: Easing.Cubic.InOut,
    onStart: () => {},
    onEnd: () => {},
    trigger: "start",
    toggle: false,
    resetOnStart: false,
};

export default ViewAnim;
