/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/engine/engine.ts":
/*!******************************!*\
  !*** ./src/engine/engine.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Engine; });
/* harmony import */ var _entities_ground__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/ground */ "./src/entities/ground.ts");

class Engine {
    constructor() {
        this.directions = {
            up: false,
            left: false,
            right: false,
        };
        this.characters = [];
        this.ground = [];
    }
    registerUserInteraction() {
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowLeft':
                case 'a':
                    this.directions.left = true;
                    this.directions.right = false;
                    break;
                case 'ArrowRight':
                case 'd':
                    this.directions.right = true;
                    this.directions.left = false;
                    break;
                case 'ArrowUp':
                case 'w':
                    this.directions.up = true;
                    break;
            }
        });
        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 'ArrowLeft':
                case 'a':
                    this.directions.left = false;
                    break;
                case 'ArrowRight':
                case 'd':
                    this.directions.right = false;
                    break;
                case 'ArrowUp':
                case 'w':
                    this.directions.up = false;
                    break;
            }
        });
    }
    updatePositions() {
        this.characters[0].updatePosition(this.directions);
        // @todo move enemy (create enemy character + ki between bounds)
    }
    isColliding(a, b) {
        const collision = !(a.x + a.width < b.x ||
            a.y + a.height < b.y ||
            a.x > b.x + b.width ||
            a.y > b.y + b.height);
        return collision;
    }
    detectCollisions() {
        this.characters.forEach(character => (character.collisions = []));
        this.ground.forEach(ground => {
            if (this.isColliding(ground, this.characters[0])) {
                this.characters[0].collisions.push(new _entities_ground__WEBPACK_IMPORTED_MODULE_0__["default"](ground.x, ground.y, ground.width, ground.height, ground.subType));
            }
        });
        // character collision
        // this.characters.forEach((character, index) => {
        //   if (index > 0 && this.isColliding(character, this.characters[0])) {
        //     this.characters[0].collisions.push(character);
        //   }
        // });
    }
    resolveCollisions() {
        this.characters.forEach(character => character.resolveCollisions());
        // @todo fall down
    }
    step() {
        // user interaction
        // positional logic
        this.updatePositions();
        // collision detection
        this.detectCollisions();
        // resolve collisions
        this.resolveCollisions();
    }
}


/***/ }),

/***/ "./src/entities/base.ts":
/*!******************************!*\
  !*** ./src/entities/base.ts ***!
  \******************************/
/*! exports provided: Type, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Type", function() { return Type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
var Type;
(function (Type) {
    Type[Type["character"] = 0] = "character";
    Type[Type["ground"] = 1] = "ground";
})(Type || (Type = {}));
class Base {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    getTop() {
        return this.y;
    }
    getBottom() {
        return this.y + this.height;
    }
    getLeft() {
        return this.x;
    }
    getRight() {
        return this.x + this.width;
    }
}


/***/ }),

/***/ "./src/entities/character.ts":
/*!***********************************!*\
  !*** ./src/entities/character.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Character; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/entities/base.ts");
/* harmony import */ var _ground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ground */ "./src/entities/ground.ts");


class Character extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = _base__WEBPACK_IMPORTED_MODULE_0__["Type"].character;
        this.collisions = [];
        this.jump = {
            maxHeight: 10,
            currentHeight: 0,
            jump: false,
        };
        this.animation = {
            direction: 'right',
            running: false,
            step: true,
        };
        this.velocity = 4;
        this.tiles = document.getElementById('character');
    }
    updatePosition(directions) {
        // decide left/right
        let direction = 0;
        this.animation.running = false;
        if (directions.left) {
            direction = -1;
            this.animation.direction = 'left';
            this.animation.running = true;
        }
        else if (directions.right) {
            direction = 1;
            this.animation.running = true;
            this.animation.direction = 'right';
        }
        // go left/right
        if (direction) {
            this.x = this.x + this.velocity * direction;
        }
        // cancel jump
        if (directions.up === false && this.jump.jump === true) {
            this.jump.jump = false;
            // @todo steht der character auf einem festen untergrund
        }
        else if (directions.up === true &&
            this.jump.currentHeight === 0 &&
            this.isStanding()) {
            this.jump.jump = true;
        }
        // @todo gravity
        // jump down
        if (!this.jump.jump) {
            if (this.jump.currentHeight > 0) {
                this.jump.currentHeight -= 1;
            }
            // @todo fall by default
            this.y += this.velocity;
            // jump up
        }
        else if (this.jump.jump) {
            this.jump.currentHeight += 1;
            this.y -= this.velocity;
            if (this.jump.currentHeight >= this.jump.maxHeight) {
                this.jump.jump = false;
            }
        }
    }
    bottomCollision(collision) {
        if (this.getRight() - collision.getLeft() === 0 ||
            this.getLeft() - collision.getRight() === 0) {
            return false;
        }
        return (this.getBottom() > collision.getTop() &&
            this.getBottom() <= collision.getTop() + this.velocity);
    }
    isStanding() {
        return this.collisions.some(collision => collision instanceof _ground__WEBPACK_IMPORTED_MODULE_1__["default"] &&
            collision.collisionResolveType === _ground__WEBPACK_IMPORTED_MODULE_1__["CollisionResolveType"].bottom);
    }
    resolveCollisions() {
        this.collisions.forEach(collision => {
            if (collision instanceof _ground__WEBPACK_IMPORTED_MODULE_1__["default"]) {
                if (collision.subType === _ground__WEBPACK_IMPORTED_MODULE_1__["SubType"].regular) {
                    // standing on the ground
                    if (this.bottomCollision(collision)) {
                        this.y = collision.getTop() - this.height;
                        collision.collisionResolveType = _ground__WEBPACK_IMPORTED_MODULE_1__["CollisionResolveType"].bottom;
                    }
                    // colliding left
                    if (this.getRight() > collision.getLeft() &&
                        this.getRight() <= collision.getLeft() + this.velocity) {
                        this.x = collision.getLeft() - this.width;
                        collision.collisionResolveType = _ground__WEBPACK_IMPORTED_MODULE_1__["CollisionResolveType"].left;
                    }
                    // colliding right
                    if (this.getLeft() < collision.getRight() &&
                        this.getLeft() >= collision.getRight() - this.velocity) {
                        this.x = collision.getRight();
                        collision.collisionResolveType = _ground__WEBPACK_IMPORTED_MODULE_1__["CollisionResolveType"].right;
                    }
                    // colliding top
                    if (this.getTop() < collision.getBottom() &&
                        this.getTop() >= collision.getBottom() - this.velocity) {
                        this.y = collision.getBottom();
                        collision.collisionResolveType = _ground__WEBPACK_IMPORTED_MODULE_1__["CollisionResolveType"].top;
                    }
                }
                else if (collision.subType === _ground__WEBPACK_IMPORTED_MODULE_1__["SubType"].bottom) {
                    throw new Error('You are dead!');
                }
                else if (collision.subType === _ground__WEBPACK_IMPORTED_MODULE_1__["SubType"].left) {
                    this.x = 0;
                }
                else if (collision.subType === _ground__WEBPACK_IMPORTED_MODULE_1__["SubType"].right) {
                    this.x = collision.getLeft() - this.width;
                }
            }
        });
    }
    render(ctx) {
        if (this.animation.direction === 'left') {
            if (this.animation.running) {
                if (this.animation.step) {
                    // running 1 left
                    ctx.drawImage(this.tiles, 10, 58, 26, 43, this.x, this.y, 26, 43);
                }
                else {
                    ctx.drawImage(this.tiles, 103, 58, 26, 43, this.x, this.y, 26, 43);
                }
            }
            else {
                ctx.drawImage(this.tiles, 57, 58, 26, 43, this.x, this.y, 26, 43);
            }
        }
        else if (this.animation.direction === 'right') {
            if (this.animation.running) {
                if (this.animation.step) {
                    ctx.drawImage(this.tiles, 10, 108, 26, 43, this.x, this.y, 26, 43);
                }
                else {
                    ctx.drawImage(this.tiles, 103, 108, 26, 43, this.x, this.y, 26, 43);
                }
            }
            else {
                ctx.drawImage(this.tiles, 57, 108, 26, 43, this.x, this.y, 26, 43);
            }
        }
        this.animation.step = !this.animation.step;
    }
}


/***/ }),

/***/ "./src/entities/ground.ts":
/*!********************************!*\
  !*** ./src/entities/ground.ts ***!
  \********************************/
/*! exports provided: SubType, CollisionResolveType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubType", function() { return SubType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollisionResolveType", function() { return CollisionResolveType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ground; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/entities/base.ts");

var SubType;
(function (SubType) {
    SubType[SubType["left"] = 0] = "left";
    SubType[SubType["right"] = 1] = "right";
    SubType[SubType["top"] = 2] = "top";
    SubType[SubType["bottom"] = 3] = "bottom";
    SubType[SubType["regular"] = 4] = "regular";
})(SubType || (SubType = {}));
var CollisionResolveType;
(function (CollisionResolveType) {
    CollisionResolveType[CollisionResolveType["left"] = 0] = "left";
    CollisionResolveType[CollisionResolveType["top"] = 1] = "top";
    CollisionResolveType[CollisionResolveType["bottom"] = 2] = "bottom";
    CollisionResolveType[CollisionResolveType["right"] = 3] = "right";
})(CollisionResolveType || (CollisionResolveType = {}));
class Ground extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(x, y, width, height, subType) {
        super(x, y, width, height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.subType = subType;
        this.type = _base__WEBPACK_IMPORTED_MODULE_0__["Type"].ground;
        this.tiles = document.getElementById('tiles');
    }
    render(ctx) {
        ctx.drawImage(this.tiles, 570, 50, 280, 260, this.x, this.y, 28, 26);
        for (let i = 1; i <= Math.ceil((this.width - 56) / 28); i++) {
            ctx.drawImage(this.tiles, 926, 50, 280, 260, this.x + i * 28, this.y, 28, 26);
        }
        ctx.drawImage(this.tiles, 1292, 50, 280, 260, this.getRight() - 28, this.y, 28, 26);
    }
}


/***/ }),

/***/ "./src/gameloop/loop.ts":
/*!******************************!*\
  !*** ./src/gameloop/loop.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Loop; });
/* harmony import */ var _shapes_rect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shapes/rect */ "./src/shapes/rect.ts");
/* harmony import */ var _entities_ground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entities/ground */ "./src/entities/ground.ts");


class Loop {
    constructor(ctx, engine) {
        this.ctx = ctx;
        this.engine = engine;
        this.delta = 0;
        this.canvas = { height: 400, width: 400 };
        this.blackRect = _shapes_rect__WEBPACK_IMPORTED_MODULE_0__["default"].createRect(0, 0, 400, 400);
        this.maxFPS = 30;
        this.lastFrameTime = 0;
        this.lastFpsUpdate = 0;
        this.timeStep = 1000 / this.maxFPS;
        this.framesThisSecond = 0;
    }
    update(delta) {
        this.engine.step();
    }
    draw() {
        this.clear();
        this.engine.ground
            .filter(ground => ground.subType === _entities_ground__WEBPACK_IMPORTED_MODULE_1__["SubType"].regular)
            .forEach(ground => {
            ground.render(this.ctx);
        });
        this.engine.characters.forEach(character => {
            character.render(this.ctx);
        });
    }
    fpsUpdate(timestamp) {
        if (timestamp > this.lastFpsUpdate + 1000) {
            this.lastFpsUpdate = timestamp;
            document.getElementById('fps').textContent = this.framesThisSecond.toString();
            this.framesThisSecond = 0;
        }
        this.framesThisSecond++;
    }
    clear() {
        this.blackRect.render(this.ctx, { fill: 'black' });
    }
    loop(timestamp) {
        // throttle
        if (timestamp < this.lastFrameTime + 1000 / this.maxFPS) {
            requestAnimationFrame(ts => this.loop(ts));
            return;
        }
        this.delta += timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;
        let numUpdateSteps = 0;
        while (this.delta >= this.timeStep) {
            this.update(this.timeStep);
            this.delta -= this.timeStep;
            if (++numUpdateSteps >= 240) {
                this.delta = 0;
                break;
            }
        }
        this.fpsUpdate(timestamp);
        this.draw();
        requestAnimationFrame(ts => this.loop(ts));
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameloop_loop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameloop/loop */ "./src/gameloop/loop.ts");
/* harmony import */ var _engine_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine/engine */ "./src/engine/engine.ts");
/* harmony import */ var _entities_character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/character */ "./src/entities/character.ts");
/* harmony import */ var _entities_ground__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/ground */ "./src/entities/ground.ts");




document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    const engine = new _engine_engine__WEBPACK_IMPORTED_MODULE_1__["default"]();
    const player = new _entities_character__WEBPACK_IMPORTED_MODULE_2__["default"](25, 200 - 43, 26, 43);
    engine.characters.push(player);
    const left = new _entities_ground__WEBPACK_IMPORTED_MODULE_3__["default"](-1, 0, 1, 400, _entities_ground__WEBPACK_IMPORTED_MODULE_3__["SubType"].left);
    const right = new _entities_ground__WEBPACK_IMPORTED_MODULE_3__["default"](400, 0, 1, 400, _entities_ground__WEBPACK_IMPORTED_MODULE_3__["SubType"].right);
    const top = new _entities_ground__WEBPACK_IMPORTED_MODULE_3__["default"](0, -1, 400, 1, _entities_ground__WEBPACK_IMPORTED_MODULE_3__["SubType"].top);
    const bottom = new _entities_ground__WEBPACK_IMPORTED_MODULE_3__["default"](0, 400, 400, 1, _entities_ground__WEBPACK_IMPORTED_MODULE_3__["SubType"].bottom);
    const platform = new _entities_ground__WEBPACK_IMPORTED_MODULE_3__["default"](0, 200, 100, 20, _entities_ground__WEBPACK_IMPORTED_MODULE_3__["SubType"].regular);
    const platform2 = new _entities_ground__WEBPACK_IMPORTED_MODULE_3__["default"](180, 200, 100, 20, _entities_ground__WEBPACK_IMPORTED_MODULE_3__["SubType"].regular);
    engine.ground.push(left);
    engine.ground.push(right);
    engine.ground.push(top);
    engine.ground.push(bottom);
    engine.ground.push(platform);
    engine.ground.push(platform2);
    const loop = new _gameloop_loop__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, engine);
    engine.registerUserInteraction();
    requestAnimationFrame(ts => loop.loop(ts));
});


/***/ }),

/***/ "./src/shapes/rect.ts":
/*!****************************!*\
  !*** ./src/shapes/rect.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rect; });
class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    render(ctx, config) {
        ctx.save();
        if (config && config.stroke) {
            ctx.strokeStyle = config.stroke;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        if (config && config.fill) {
            ctx.fillStyle = config.fill;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if (!config) {
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        ctx.restore();
    }
    static createRect(x, y, width, height) {
        return new Rect(x, y, width, height);
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZS9lbmdpbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2Jhc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL2NoYXJhY3Rlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvZ3JvdW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lbG9vcC9sb29wLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcGVzL3JlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2pGQTtBQUFBO0FBQUE7QUFBd0M7QUFTekIsTUFBTSxNQUFNO0lBQTNCO1FBQ0UsZUFBVSxHQUFlO1lBQ3ZCLEVBQUUsRUFBRSxLQUFLO1lB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LENBQUMsSUFBSSxFQUFFO1lBQ3pCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM1QixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2RDtRQUVELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6RDtRQUVELEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ25FLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNGIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgQ2hhcmFjdGVyIGZyb20gJy4uL2VudGl0aWVzL2NoYXJhY3Rlcic7XG5pbXBvcnQgR3JvdW5kIGZyb20gJy4uL2VudGl0aWVzL2dyb3VuZCc7XG5pbXBvcnQgQmFzZSBmcm9tICcuLi9lbnRpdGllcy9iYXNlJztcblxuZXhwb3J0IGludGVyZmFjZSBEaXJlY3Rpb25zIHtcbiAgdXA6IGJvb2xlYW47XG4gIGxlZnQ6IGJvb2xlYW47XG4gIHJpZ2h0OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmdpbmUge1xuICBkaXJlY3Rpb25zOiBEaXJlY3Rpb25zID0ge1xuICAgIHVwOiBmYWxzZSxcbiAgICBsZWZ0OiBmYWxzZSxcbiAgICByaWdodDogZmFsc2UsXG4gIH07XG5cbiAgcHVibGljIGNoYXJhY3RlcnM6IENoYXJhY3RlcltdID0gW107XG4gIHB1YmxpYyBncm91bmQ6IEdyb3VuZFtdID0gW107XG5cbiAgcHVibGljIHJlZ2lzdGVyVXNlckludGVyYWN0aW9uKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcbiAgICAgIHN3aXRjaCAoZS5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgY2FzZSAnYSc6XG4gICAgICAgICAgdGhpcy5kaXJlY3Rpb25zLmxlZnQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuZGlyZWN0aW9ucy5yaWdodCA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgdGhpcy5kaXJlY3Rpb25zLnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmRpcmVjdGlvbnMubGVmdCA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgY2FzZSAndyc6XG4gICAgICAgICAgdGhpcy5kaXJlY3Rpb25zLnVwID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XG4gICAgICBzd2l0Y2ggKGUua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgIGNhc2UgJ2EnOlxuICAgICAgICAgIHRoaXMuZGlyZWN0aW9ucy5sZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICB0aGlzLmRpcmVjdGlvbnMucmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIGNhc2UgJ3cnOlxuICAgICAgICAgIHRoaXMuZGlyZWN0aW9ucy51cCA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlUG9zaXRpb25zKCkge1xuICAgIHRoaXMuY2hhcmFjdGVyc1swXS51cGRhdGVQb3NpdGlvbih0aGlzLmRpcmVjdGlvbnMpO1xuXG4gICAgLy8gQHRvZG8gbW92ZSBlbmVteSAoY3JlYXRlIGVuZW15IGNoYXJhY3RlciArIGtpIGJldHdlZW4gYm91bmRzKVxuICB9XG5cbiAgaXNDb2xsaWRpbmcoYTogQmFzZSwgYjogQmFzZSkge1xuICAgIGNvbnN0IGNvbGxpc2lvbiA9ICEoXG4gICAgICBhLnggKyBhLndpZHRoIDwgYi54IHx8XG4gICAgICBhLnkgKyBhLmhlaWdodCA8IGIueSB8fFxuICAgICAgYS54ID4gYi54ICsgYi53aWR0aCB8fFxuICAgICAgYS55ID4gYi55ICsgYi5oZWlnaHRcbiAgICApO1xuICAgIHJldHVybiBjb2xsaXNpb247XG4gIH1cblxuICBkZXRlY3RDb2xsaXNpb25zKCkge1xuICAgIHRoaXMuY2hhcmFjdGVycy5mb3JFYWNoKGNoYXJhY3RlciA9PiAoY2hhcmFjdGVyLmNvbGxpc2lvbnMgPSBbXSkpO1xuXG4gICAgdGhpcy5ncm91bmQuZm9yRWFjaChncm91bmQgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNDb2xsaWRpbmcoZ3JvdW5kLCB0aGlzLmNoYXJhY3RlcnNbMF0pKSB7XG4gICAgICAgIHRoaXMuY2hhcmFjdGVyc1swXS5jb2xsaXNpb25zLnB1c2goXG4gICAgICAgICAgbmV3IEdyb3VuZChcbiAgICAgICAgICAgIGdyb3VuZC54LFxuICAgICAgICAgICAgZ3JvdW5kLnksXG4gICAgICAgICAgICBncm91bmQud2lkdGgsXG4gICAgICAgICAgICBncm91bmQuaGVpZ2h0LFxuICAgICAgICAgICAgZ3JvdW5kLnN1YlR5cGVcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBjaGFyYWN0ZXIgY29sbGlzaW9uXG4gICAgLy8gdGhpcy5jaGFyYWN0ZXJzLmZvckVhY2goKGNoYXJhY3RlciwgaW5kZXgpID0+IHtcbiAgICAvLyAgIGlmIChpbmRleCA+IDAgJiYgdGhpcy5pc0NvbGxpZGluZyhjaGFyYWN0ZXIsIHRoaXMuY2hhcmFjdGVyc1swXSkpIHtcbiAgICAvLyAgICAgdGhpcy5jaGFyYWN0ZXJzWzBdLmNvbGxpc2lvbnMucHVzaChjaGFyYWN0ZXIpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICB9XG5cbiAgcmVzb2x2ZUNvbGxpc2lvbnMoKSB7XG4gICAgdGhpcy5jaGFyYWN0ZXJzLmZvckVhY2goY2hhcmFjdGVyID0+IGNoYXJhY3Rlci5yZXNvbHZlQ29sbGlzaW9ucygpKTtcbiAgICAvLyBAdG9kbyBmYWxsIGRvd25cbiAgfVxuXG4gIHB1YmxpYyBzdGVwKCkge1xuICAgIC8vIHVzZXIgaW50ZXJhY3Rpb25cbiAgICAvLyBwb3NpdGlvbmFsIGxvZ2ljXG4gICAgdGhpcy51cGRhdGVQb3NpdGlvbnMoKTtcbiAgICAvLyBjb2xsaXNpb24gZGV0ZWN0aW9uXG4gICAgdGhpcy5kZXRlY3RDb2xsaXNpb25zKCk7XG4gICAgLy8gcmVzb2x2ZSBjb2xsaXNpb25zXG4gICAgdGhpcy5yZXNvbHZlQ29sbGlzaW9ucygpO1xuICB9XG59XG4iLCJleHBvcnQgZW51bSBUeXBlIHtcbiAgY2hhcmFjdGVyLFxuICBncm91bmQsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2Uge1xuICBwdWJsaWMgdHlwZTogVHlwZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgeDogbnVtYmVyLFxuICAgIHB1YmxpYyB5OiBudW1iZXIsXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXIsXG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyXG4gICkge31cblxuICBnZXRUb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMueTtcbiAgfVxuXG4gIGdldEJvdHRvbSgpIHtcbiAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XG4gIH1cblxuICBnZXRMZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLng7XG4gIH1cblxuICBnZXRSaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aDtcbiAgfVxufVxuIiwiaW1wb3J0IEJhc2UsIHsgVHlwZSB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25zIH0gZnJvbSAnLi4vZW5naW5lL2VuZ2luZSc7XG5pbXBvcnQgR3JvdW5kLCB7IFN1YlR5cGUsIENvbGxpc2lvblJlc29sdmVUeXBlIH0gZnJvbSAnLi9ncm91bmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXIgZXh0ZW5kcyBCYXNlIHtcbiAgcHVibGljIHR5cGUgPSBUeXBlLmNoYXJhY3RlcjtcbiAgcHJpdmF0ZSB0aWxlczogSFRNTEltYWdlRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLnRpbGVzID0gPEhUTUxJbWFnZUVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXJhY3RlcicpO1xuICB9XG5cbiAgcHVibGljIGNvbGxpc2lvbnM6IEJhc2VbXSA9IFtdO1xuXG4gIHB1YmxpYyBqdW1wID0ge1xuICAgIG1heEhlaWdodDogMTAsXG4gICAgY3VycmVudEhlaWdodDogMCxcbiAgICBqdW1wOiBmYWxzZSxcbiAgfTtcblxuICBwdWJsaWMgYW5pbWF0aW9uID0ge1xuICAgIGRpcmVjdGlvbjogJ3JpZ2h0JyxcbiAgICBydW5uaW5nOiBmYWxzZSxcbiAgICBzdGVwOiB0cnVlLFxuICB9O1xuXG4gIHB1YmxpYyB2ZWxvY2l0eSA9IDQ7XG5cbiAgdXBkYXRlUG9zaXRpb24oZGlyZWN0aW9uczogRGlyZWN0aW9ucykge1xuICAgIC8vIGRlY2lkZSBsZWZ0L3JpZ2h0XG4gICAgbGV0IGRpcmVjdGlvbiA9IDA7XG4gICAgdGhpcy5hbmltYXRpb24ucnVubmluZyA9IGZhbHNlO1xuICAgIGlmIChkaXJlY3Rpb25zLmxlZnQpIHtcbiAgICAgIGRpcmVjdGlvbiA9IC0xO1xuICAgICAgdGhpcy5hbmltYXRpb24uZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgdGhpcy5hbmltYXRpb24ucnVubmluZyA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb25zLnJpZ2h0KSB7XG4gICAgICBkaXJlY3Rpb24gPSAxO1xuICAgICAgdGhpcy5hbmltYXRpb24ucnVubmluZyA9IHRydWU7XG4gICAgICB0aGlzLmFuaW1hdGlvbi5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgIH1cblxuICAgIC8vIGdvIGxlZnQvcmlnaHRcbiAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICB0aGlzLnggPSB0aGlzLnggKyB0aGlzLnZlbG9jaXR5ICogZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIC8vIGNhbmNlbCBqdW1wXG4gICAgaWYgKGRpcmVjdGlvbnMudXAgPT09IGZhbHNlICYmIHRoaXMuanVtcC5qdW1wID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmp1bXAuanVtcCA9IGZhbHNlO1xuICAgICAgLy8gQHRvZG8gc3RlaHQgZGVyIGNoYXJhY3RlciBhdWYgZWluZW0gZmVzdGVuIHVudGVyZ3J1bmRcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgZGlyZWN0aW9ucy51cCA9PT0gdHJ1ZSAmJlxuICAgICAgdGhpcy5qdW1wLmN1cnJlbnRIZWlnaHQgPT09IDAgJiZcbiAgICAgIHRoaXMuaXNTdGFuZGluZygpXG4gICAgKSB7XG4gICAgICB0aGlzLmp1bXAuanVtcCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQHRvZG8gZ3Jhdml0eVxuICAgIC8vIGp1bXAgZG93blxuICAgIGlmICghdGhpcy5qdW1wLmp1bXApIHtcbiAgICAgIGlmICh0aGlzLmp1bXAuY3VycmVudEhlaWdodCA+IDApIHtcbiAgICAgICAgdGhpcy5qdW1wLmN1cnJlbnRIZWlnaHQgLT0gMTtcbiAgICAgIH1cbiAgICAgIC8vIEB0b2RvIGZhbGwgYnkgZGVmYXVsdFxuICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHk7XG4gICAgICAvLyBqdW1wIHVwXG4gICAgfSBlbHNlIGlmICh0aGlzLmp1bXAuanVtcCkge1xuICAgICAgdGhpcy5qdW1wLmN1cnJlbnRIZWlnaHQgKz0gMTtcbiAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5O1xuICAgICAgaWYgKHRoaXMuanVtcC5jdXJyZW50SGVpZ2h0ID49IHRoaXMuanVtcC5tYXhIZWlnaHQpIHtcbiAgICAgICAgdGhpcy5qdW1wLmp1bXAgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBib3R0b21Db2xsaXNpb24oY29sbGlzaW9uOiBCYXNlKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRSaWdodCgpIC0gY29sbGlzaW9uLmdldExlZnQoKSA9PT0gMCB8fFxuICAgICAgdGhpcy5nZXRMZWZ0KCkgLSBjb2xsaXNpb24uZ2V0UmlnaHQoKSA9PT0gMFxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRCb3R0b20oKSA+IGNvbGxpc2lvbi5nZXRUb3AoKSAmJlxuICAgICAgdGhpcy5nZXRCb3R0b20oKSA8PSBjb2xsaXNpb24uZ2V0VG9wKCkgKyB0aGlzLnZlbG9jaXR5XG4gICAgKTtcbiAgfVxuXG4gIGlzU3RhbmRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGlzaW9ucy5zb21lKFxuICAgICAgY29sbGlzaW9uID0+XG4gICAgICAgIGNvbGxpc2lvbiBpbnN0YW5jZW9mIEdyb3VuZCAmJlxuICAgICAgICBjb2xsaXNpb24uY29sbGlzaW9uUmVzb2x2ZVR5cGUgPT09IENvbGxpc2lvblJlc29sdmVUeXBlLmJvdHRvbVxuICAgICk7XG4gIH1cblxuICByZXNvbHZlQ29sbGlzaW9ucygpIHtcbiAgICB0aGlzLmNvbGxpc2lvbnMuZm9yRWFjaChjb2xsaXNpb24gPT4ge1xuICAgICAgaWYgKGNvbGxpc2lvbiBpbnN0YW5jZW9mIEdyb3VuZCkge1xuICAgICAgICBpZiAoY29sbGlzaW9uLnN1YlR5cGUgPT09IFN1YlR5cGUucmVndWxhcikge1xuICAgICAgICAgIC8vIHN0YW5kaW5nIG9uIHRoZSBncm91bmRcbiAgICAgICAgICBpZiAodGhpcy5ib3R0b21Db2xsaXNpb24oY29sbGlzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy55ID0gY29sbGlzaW9uLmdldFRvcCgpIC0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICBjb2xsaXNpb24uY29sbGlzaW9uUmVzb2x2ZVR5cGUgPSBDb2xsaXNpb25SZXNvbHZlVHlwZS5ib3R0b207XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbGxpZGluZyBsZWZ0XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5nZXRSaWdodCgpID4gY29sbGlzaW9uLmdldExlZnQoKSAmJlxuICAgICAgICAgICAgdGhpcy5nZXRSaWdodCgpIDw9IGNvbGxpc2lvbi5nZXRMZWZ0KCkgKyB0aGlzLnZlbG9jaXR5XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnggPSBjb2xsaXNpb24uZ2V0TGVmdCgpIC0gdGhpcy53aWR0aDtcbiAgICAgICAgICAgIGNvbGxpc2lvbi5jb2xsaXNpb25SZXNvbHZlVHlwZSA9IENvbGxpc2lvblJlc29sdmVUeXBlLmxlZnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbGxpZGluZyByaWdodFxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuZ2V0TGVmdCgpIDwgY29sbGlzaW9uLmdldFJpZ2h0KCkgJiZcbiAgICAgICAgICAgIHRoaXMuZ2V0TGVmdCgpID49IGNvbGxpc2lvbi5nZXRSaWdodCgpIC0gdGhpcy52ZWxvY2l0eVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy54ID0gY29sbGlzaW9uLmdldFJpZ2h0KCk7XG4gICAgICAgICAgICBjb2xsaXNpb24uY29sbGlzaW9uUmVzb2x2ZVR5cGUgPSBDb2xsaXNpb25SZXNvbHZlVHlwZS5yaWdodDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY29sbGlkaW5nIHRvcFxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9wKCkgPCBjb2xsaXNpb24uZ2V0Qm90dG9tKCkgJiZcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9wKCkgPj0gY29sbGlzaW9uLmdldEJvdHRvbSgpIC0gdGhpcy52ZWxvY2l0eVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy55ID0gY29sbGlzaW9uLmdldEJvdHRvbSgpO1xuICAgICAgICAgICAgY29sbGlzaW9uLmNvbGxpc2lvblJlc29sdmVUeXBlID0gQ29sbGlzaW9uUmVzb2x2ZVR5cGUudG9wO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjb2xsaXNpb24uc3ViVHlwZSA9PT0gU3ViVHlwZS5ib3R0b20pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBhcmUgZGVhZCEnKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2xsaXNpb24uc3ViVHlwZSA9PT0gU3ViVHlwZS5sZWZ0KSB7XG4gICAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChjb2xsaXNpb24uc3ViVHlwZSA9PT0gU3ViVHlwZS5yaWdodCkge1xuICAgICAgICAgIHRoaXMueCA9IGNvbGxpc2lvbi5nZXRMZWZ0KCkgLSB0aGlzLndpZHRoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICBpZiAodGhpcy5hbmltYXRpb24uZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5ydW5uaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5zdGVwKSB7XG4gICAgICAgICAgLy8gcnVubmluZyAxIGxlZnRcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMudGlsZXMsIDEwLCA1OCwgMjYsIDQzLCB0aGlzLngsIHRoaXMueSwgMjYsIDQzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMudGlsZXMsIDEwMywgNTgsIDI2LCA0MywgdGhpcy54LCB0aGlzLnksIDI2LCA0Myk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy50aWxlcywgNTcsIDU4LCAyNiwgNDMsIHRoaXMueCwgdGhpcy55LCAyNiwgNDMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5hbmltYXRpb24uZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICBpZiAodGhpcy5hbmltYXRpb24ucnVubmluZykge1xuICAgICAgICBpZiAodGhpcy5hbmltYXRpb24uc3RlcCkge1xuICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy50aWxlcywgMTAsIDEwOCwgMjYsIDQzLCB0aGlzLngsIHRoaXMueSwgMjYsIDQzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMudGlsZXMsIDEwMywgMTA4LCAyNiwgNDMsIHRoaXMueCwgdGhpcy55LCAyNiwgNDMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMudGlsZXMsIDU3LCAxMDgsIDI2LCA0MywgdGhpcy54LCB0aGlzLnksIDI2LCA0Myk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hbmltYXRpb24uc3RlcCA9ICF0aGlzLmFuaW1hdGlvbi5zdGVwO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZSwgeyBUeXBlIH0gZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGVudW0gU3ViVHlwZSB7XG4gIGxlZnQsXG4gIHJpZ2h0LFxuICB0b3AsXG4gIGJvdHRvbSxcbiAgcmVndWxhcixcbn1cblxuZXhwb3J0IGVudW0gQ29sbGlzaW9uUmVzb2x2ZVR5cGUge1xuICBsZWZ0LFxuICB0b3AsXG4gIGJvdHRvbSxcbiAgcmlnaHQsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VuZCBleHRlbmRzIEJhc2Uge1xuICBwdWJsaWMgdHlwZSA9IFR5cGUuZ3JvdW5kO1xuICBwdWJsaWMgY29sbGlzaW9uUmVzb2x2ZVR5cGU6IENvbGxpc2lvblJlc29sdmVUeXBlO1xuICBwcml2YXRlIHRpbGVzOiBIVE1MSW1hZ2VFbGVtZW50O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgeDogbnVtYmVyLFxuICAgIHB1YmxpYyB5OiBudW1iZXIsXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXIsXG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyLFxuICAgIHB1YmxpYyBzdWJUeXBlOiBTdWJUeXBlXG4gICkge1xuICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMudGlsZXMgPSA8SFRNTEltYWdlRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGlsZXMnKTtcbiAgfVxuXG4gIHJlbmRlcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgIGN0eC5kcmF3SW1hZ2UodGhpcy50aWxlcywgNTcwLCA1MCwgMjgwLCAyNjAsIHRoaXMueCwgdGhpcy55LCAyOCwgMjYpO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IE1hdGguY2VpbCgodGhpcy53aWR0aCAtIDU2KSAvIDI4KTsgaSsrKSB7XG4gICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLnRpbGVzLFxuICAgICAgICA5MjYsXG4gICAgICAgIDUwLFxuICAgICAgICAyODAsXG4gICAgICAgIDI2MCxcbiAgICAgICAgdGhpcy54ICsgaSAqIDI4LFxuICAgICAgICB0aGlzLnksXG4gICAgICAgIDI4LFxuICAgICAgICAyNlxuICAgICAgKTtcbiAgICB9XG4gICAgY3R4LmRyYXdJbWFnZShcbiAgICAgIHRoaXMudGlsZXMsXG4gICAgICAxMjkyLFxuICAgICAgNTAsXG4gICAgICAyODAsXG4gICAgICAyNjAsXG4gICAgICB0aGlzLmdldFJpZ2h0KCkgLSAyOCxcbiAgICAgIHRoaXMueSxcbiAgICAgIDI4LFxuICAgICAgMjZcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgUmVjdCBmcm9tICcuLi9zaGFwZXMvcmVjdCc7XG5pbXBvcnQgQ2FudmFzIGZyb20gJy4uL3NoYXBlcy9jYW52YXMnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuLi9jaGFycy9wbGF5ZXInO1xuaW1wb3J0IEVuZ2luZSBmcm9tICcuLi9lbmdpbmUvZW5naW5lJztcbmltcG9ydCB7IFN1YlR5cGUgfSBmcm9tICcuLi9lbnRpdGllcy9ncm91bmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb29wIHtcbiAgcHJpdmF0ZSBkZWx0YSA9IDA7XG4gIHByaXZhdGUgY2FudmFzOiBDYW52YXMgPSB7IGhlaWdodDogNDAwLCB3aWR0aDogNDAwIH07XG4gIHByaXZhdGUgYmxhY2tSZWN0ID0gUmVjdC5jcmVhdGVSZWN0KDAsIDAsIDQwMCwgNDAwKTtcbiAgcHJpdmF0ZSBtYXhGUFMgPSAzMDtcbiAgcHJpdmF0ZSBsYXN0RnJhbWVUaW1lID0gMDtcbiAgcHJpdmF0ZSBsYXN0RnBzVXBkYXRlID0gMDtcbiAgcHJpdmF0ZSB0aW1lU3RlcCA9IDEwMDAgLyB0aGlzLm1heEZQUztcbiAgcHJpdmF0ZSBmcmFtZXNUaGlzU2Vjb25kID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBwdWJsaWMgZW5naW5lOiBFbmdpbmUpIHt9XG5cbiAgdXBkYXRlKGRlbHRhOiBudW1iZXIpIHtcbiAgICB0aGlzLmVuZ2luZS5zdGVwKCk7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLmVuZ2luZS5ncm91bmRcbiAgICAgIC5maWx0ZXIoZ3JvdW5kID0+IGdyb3VuZC5zdWJUeXBlID09PSBTdWJUeXBlLnJlZ3VsYXIpXG4gICAgICAuZm9yRWFjaChncm91bmQgPT4ge1xuICAgICAgICBncm91bmQucmVuZGVyKHRoaXMuY3R4KTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5lbmdpbmUuY2hhcmFjdGVycy5mb3JFYWNoKGNoYXJhY3RlciA9PiB7XG4gICAgICBjaGFyYWN0ZXIucmVuZGVyKHRoaXMuY3R4KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZwc1VwZGF0ZSh0aW1lc3RhbXA6IG51bWJlcikge1xuICAgIGlmICh0aW1lc3RhbXAgPiB0aGlzLmxhc3RGcHNVcGRhdGUgKyAxMDAwKSB7XG4gICAgICB0aGlzLmxhc3RGcHNVcGRhdGUgPSB0aW1lc3RhbXA7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgJ2ZwcydcbiAgICAgICkudGV4dENvbnRlbnQgPSB0aGlzLmZyYW1lc1RoaXNTZWNvbmQudG9TdHJpbmcoKTtcbiAgICAgIHRoaXMuZnJhbWVzVGhpc1NlY29uZCA9IDA7XG4gICAgfVxuICAgIHRoaXMuZnJhbWVzVGhpc1NlY29uZCsrO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5ibGFja1JlY3QucmVuZGVyKHRoaXMuY3R4LCB7IGZpbGw6ICdibGFjaycgfSk7XG4gIH1cblxuICBsb29wKHRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgLy8gdGhyb3R0bGVcbiAgICBpZiAodGltZXN0YW1wIDwgdGhpcy5sYXN0RnJhbWVUaW1lICsgMTAwMCAvIHRoaXMubWF4RlBTKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodHMgPT4gdGhpcy5sb29wKHRzKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGVsdGEgKz0gdGltZXN0YW1wIC0gdGhpcy5sYXN0RnJhbWVUaW1lO1xuICAgIHRoaXMubGFzdEZyYW1lVGltZSA9IHRpbWVzdGFtcDtcblxuICAgIGxldCBudW1VcGRhdGVTdGVwcyA9IDA7XG4gICAgd2hpbGUgKHRoaXMuZGVsdGEgPj0gdGhpcy50aW1lU3RlcCkge1xuICAgICAgdGhpcy51cGRhdGUodGhpcy50aW1lU3RlcCk7XG4gICAgICB0aGlzLmRlbHRhIC09IHRoaXMudGltZVN0ZXA7XG4gICAgICBpZiAoKytudW1VcGRhdGVTdGVwcyA+PSAyNDApIHtcbiAgICAgICAgdGhpcy5kZWx0YSA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZnBzVXBkYXRlKHRpbWVzdGFtcCk7XG4gICAgdGhpcy5kcmF3KCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRzID0+IHRoaXMubG9vcCh0cykpO1xuICB9XG59XG4iLCJpbXBvcnQgTG9vcCBmcm9tICcuL2dhbWVsb29wL2xvb3AnO1xuaW1wb3J0IEVuZ2luZSBmcm9tICcuL2VuZ2luZS9lbmdpbmUnO1xuaW1wb3J0IENoYXJhY3RlciBmcm9tICcuL2VudGl0aWVzL2NoYXJhY3Rlcic7XG5pbXBvcnQgR3JvdW5kLCB7IFN1YlR5cGUgfSBmcm9tICcuL2VudGl0aWVzL2dyb3VuZCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpO1xuICBjb25zdCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIGNvbnN0IGVuZ2luZSA9IG5ldyBFbmdpbmUoKTtcblxuICBjb25zdCBwbGF5ZXIgPSBuZXcgQ2hhcmFjdGVyKDI1LCAyMDAgLSA0MywgMjYsIDQzKTtcbiAgZW5naW5lLmNoYXJhY3RlcnMucHVzaChwbGF5ZXIpO1xuXG4gIGNvbnN0IGxlZnQgPSBuZXcgR3JvdW5kKC0xLCAwLCAxLCA0MDAsIFN1YlR5cGUubGVmdCk7XG4gIGNvbnN0IHJpZ2h0ID0gbmV3IEdyb3VuZCg0MDAsIDAsIDEsIDQwMCwgU3ViVHlwZS5yaWdodCk7XG4gIGNvbnN0IHRvcCA9IG5ldyBHcm91bmQoMCwgLTEsIDQwMCwgMSwgU3ViVHlwZS50b3ApO1xuICBjb25zdCBib3R0b20gPSBuZXcgR3JvdW5kKDAsIDQwMCwgNDAwLCAxLCBTdWJUeXBlLmJvdHRvbSk7XG5cbiAgY29uc3QgcGxhdGZvcm0gPSBuZXcgR3JvdW5kKDAsIDIwMCwgMTAwLCAyMCwgU3ViVHlwZS5yZWd1bGFyKTtcbiAgY29uc3QgcGxhdGZvcm0yID0gbmV3IEdyb3VuZCgxODAsIDIwMCwgMTAwLCAyMCwgU3ViVHlwZS5yZWd1bGFyKTtcblxuICBlbmdpbmUuZ3JvdW5kLnB1c2gobGVmdCk7XG4gIGVuZ2luZS5ncm91bmQucHVzaChyaWdodCk7XG4gIGVuZ2luZS5ncm91bmQucHVzaCh0b3ApO1xuICBlbmdpbmUuZ3JvdW5kLnB1c2goYm90dG9tKTtcbiAgZW5naW5lLmdyb3VuZC5wdXNoKHBsYXRmb3JtKTtcbiAgZW5naW5lLmdyb3VuZC5wdXNoKHBsYXRmb3JtMik7XG5cbiAgY29uc3QgbG9vcCA9IG5ldyBMb29wKGN0eCwgZW5naW5lKTtcbiAgZW5naW5lLnJlZ2lzdGVyVXNlckludGVyYWN0aW9uKCk7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0cyA9PiBsb29wLmxvb3AodHMpKTtcbn0pO1xuIiwiaW1wb3J0IHsgQ2FudmFzQ29uZmlnIH0gZnJvbSAnLi4vY29udGV4dENvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgeDogbnVtYmVyLFxuICAgIHB1YmxpYyB5OiBudW1iZXIsXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXIsXG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyXG4gICkge31cblxuICByZW5kZXIoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGNvbmZpZz86IENhbnZhc0NvbmZpZykge1xuICAgIGN0eC5zYXZlKCk7XG4gICAgaWYgKGNvbmZpZyAmJiBjb25maWcuc3Ryb2tlKSB7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb25maWcuc3Ryb2tlO1xuICAgICAgY3R4LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZyAmJiBjb25maWcuZmlsbCkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbmZpZy5maWxsO1xuICAgICAgY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIGN0eC5zdHJva2VSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVSZWN0KHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==