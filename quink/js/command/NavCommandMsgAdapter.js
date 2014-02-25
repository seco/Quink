/**
 * Quink, Copyright (c) 2013-2014 IMD - International Institute for Management Development, Switzerland.
 *
 * This file is part of Quink.
 * 
 * Quink is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Quink is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Quink.  If not, see <http://www.gnu.org/licenses/>.
 */

define([
    'Underscore',
    'nav/NavCommandHandler'
], function (_, NavCommandHandler) {
    'use strict';

    var NavCommandMsgAdapter = function () {
        this.handler = new NavCommandHandler();
    };

    NavCommandMsgAdapter.prototype.getHandler = function () {
        return this.handler;
    };

    NavCommandMsgAdapter.prototype.accept = function (msg) {
        return msg.split('.')[0] === 'nav';
    };

    NavCommandMsgAdapter.prototype.handle = function (msg) {
        var ar = msg.split('.'),
            funcName = this.getFuncName(ar),
            handler = this.getHandler();
        if (funcName && _.isFunction(handler[funcName])) {
            handler[funcName]();
        } else {
            throw new Error('Can\'t handle msg: ' + msg);
        }
    };

    NavCommandMsgAdapter.prototype.getFuncName = function (ar) {
        var funcName = ar[1].toLowerCase();
        if (ar.length > 2) {
            funcName += ar[2].charAt(0).toUpperCase() + ar[2].substr(1);
        }
        return funcName;
    };

    var instance;

    function getInstance() {
        if (!instance) {
            instance = new NavCommandMsgAdapter();
        }
        return instance;
    }

    return {
        getInstance: getInstance
    };
});
