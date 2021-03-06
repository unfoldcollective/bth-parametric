var rays_params;
var animation_params;

function setup() {
    createCanvas(windowWidth, windowHeight);
    smooth();
    
    background(0);
    stroke(255);

    rays_params = {
        nRaysDrawn: 12,
        nRaysDrawn_range: [0,12],
        nRaysTotal: 24,
        nRaysTotal_range: [0,24],
        originX: 0.35 * width,
        originX_range: [0, width],
        originY: 0.8 * height,
        originY_range: [0, height],
        radius: 0.3 * width,
        radius_range: [0, max(width, height)],
        originOffsetX: 0.4,
        originOffsetX_range: [-1, 2],
        originOffsetY: -0.1,
        originOffsetY_range: [-1, 2],
        circleOffsetX: 1,
        circleOffsetX_range: [-1, 2],
        circleOffsetY: 1,
        circleOffsetY_range: [-1, 2],
    };
    animation_params = {
        opacity: 255,
        duration: 3, 
        delay: 0,
        animationNames: [
            'fade',
            'none',
        ],
        animationFuncs: [
            fade,
            none,
        ],
        selectedAnimation: null,
    };
    animation_params.selectedAnimation = 0;

    controlKit = new ControlKit();
    controlKit
        .addPanel({
            label: "Rays Parameters",
        })
        .addGroup()
            .addSlider(rays_params, 'nRaysDrawn',    'nRaysDrawn_range')
            .addRange(rays_params,  'nRaysDrawn_range', {label:'nRaysDrawn_range'})
            .addSlider(rays_params, 'nRaysTotal',    'nRaysTotal_range')
            .addSlider(rays_params, 'originX',       'originX_range')
            .addSlider(rays_params, 'originY',       'originY_range')
            .addSlider(rays_params, 'radius',        'radius_range')
            .addSlider(rays_params, 'originOffsetX', 'originOffsetX_range')
            .addSlider(rays_params, 'originOffsetY', 'originOffsetY_range')
            .addSlider(rays_params, 'circleOffsetX', 'circleOffsetX_range')
            .addSlider(rays_params, 'circleOffsetY', 'circleOffsetY_range')
    controlKit
        .addPanel({
            label: "Animation",
        })
        .addGroup()
            .addSelect(animation_params,'animationNames',{
                target:'selectedAnimation',
                onChange: function (animationIndex) {
                    animation_params.selectedAnimation = animationIndex
                    animate();
                }
            })

    animate();    
}

function draw() {
    background(0);

    _.range(rays_params.nRaysDrawn)
        .map(function(index) {
            return getPosOnCircle(
                createVector(rays_params.originX, rays_params.originY), 
                rays_params.radius, 
                (rays_params.nRaysTotal + 1)/rays_params.nRaysTotal * Math.PI, 
                rays_params.nRaysTotal,
                index
            )
        })
        .map(function(circlePos, index) {
            stroke(animation_params.opacity);
            line(
                lerp(rays_params.originX, circlePos.x, rays_params.originOffsetX), 
                lerp(rays_params.originY, circlePos.y, rays_params.originOffsetY),
                lerp(rays_params.originX, circlePos.x, rays_params.circleOffsetX), 
                lerp(rays_params.originY, circlePos.y, rays_params.circleOffsetY), 
            );
        });
}

function animate() {
    animation_params.animationFuncs[animation_params.selectedAnimation](
        animation_params, 
        animation_params.duration, 
        animation_params.delay, 
        animate);
}

function fade (obj, duration, delay, onComplete) {
    TweenMax.to(obj, 0.5 * duration, {
        opacity:255,
        delay:delay,
    });
    TweenMax.to(obj, 0.5 * duration, {
        delay:delay + 0.5 * duration,
        opacity:0,
        onComplete: onComplete,
    });
}

function none (obj) {
    TweenMax.set(obj, {
        opacity:255,
    });
}

function wave(obj, duration, delay, onComplete) {
    // test animation 
    // TODO implement wave
    TweenMax.to(obj, 0.5 * duration, {
        opacity: 100,
        delay:delay,
    });
    TweenMax.to(obj, 0.5 * duration, {
        delay:delay + 0.5 * duration,
        opacity:0,
        onComplete: onComplete,
    });
    console.log("wave");
}

function getPosOnCircle(midPosition, radius, rotation, n, index) {
    var angle = (index * TWO_PI / n) + rotation;
    return createVector(
        midPosition.x + radius * Math.cos(angle), 
        midPosition.y + radius * Math.sin(angle)
    );
}

// event handlers

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyTyped() {
  // if (key === 'g') {
  //   toggleGUIs();
  // }
  // uncomment to prevent any default behavior
  // return false;
}