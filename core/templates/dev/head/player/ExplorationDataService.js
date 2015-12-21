// Copyright 2015 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Service that stores data about the exploration blob needed for
 * the learner view.
 *
 * @author sean@seanlip.org (Sean Lip)
 */

oppia.factory('Exploration', [
    'INTERACTION_SPECS', 'INTERACTION_DISPLAY_MODE_INLINE',
    function(INTERACTION_SPECS, INTERACTION_DISPLAY_MODE_INLINE) {

  function Exploration(
      initStateName, paramChanges, paramSpecs, skinCustomizations, states,
      title) {
    this.initStateName = initStateName;
    this.paramChanges = paramChanges;
    this.paramSpecs = paramSpecs;
    this.skinCustomizations = skinCustomizations;
    this.states = states;
    this.title = title;
  }

  // Instance methods
  Exploration.prototype.isStateTerminal = function(stateName) {
    return (
      stateName && this.getInteractionId(stateName) &&
      INTERACTION_SPECS[this.getInteractionId(stateName)].is_terminal);
  };

  Exploration.prototype.getInteraction = function(stateName) {
    return this.states[stateName].interaction;
  };

  Exploration.prototype.getInteractionId = function(stateName) {
    return this.states[stateName].interaction.id;
  };

  Exploration.prototype.getInteractionCustomizationArgs = function(stateName) {
    return this.states[stateName].interaction.customization_args;
  };

  Exploration.prototype.getInteractionInstructions = function(stateName) {
    var interactionId = this.getInteractionId(stateName);
    return interactionId ? INTERACTION_SPECS[interactionId].instructions : '';
  };

  Exploration.prototype.getInteractionThumbnailSrc = function(stateName) {
    // TODO(sll): unify this with the 'choose interaction' modal in
    // state_editor_interaction.html.
    var interactionId = this.getInteractionId(stateName);
    return interactionId ? (
      '/extensions/interactions/' + interactionId + '/static/' +
      interactionId + '.png') : '';
  };

  Exploration.prototype.isInteractionInline = function(stateName) {
    var interactionId = this.getInteractionId(stateName);

    // Note that we treat a null interaction as an inline one, so that the
    // error message associated with it is displayed in the most compact way
    // possible in the learner view.
    return (
      !interactionId ||
      INTERACTION_SPECS[interactionId].display_mode ===
        INTERACTION_DISPLAY_MODE_INLINE);
  };

  Exploration.prototype.getGadgetPanelsContents = function() {
    return angular.copy(this.skinCustomizations.panels_contents);
  };

  Exploration.prototype.getState = function(stateName) {
    return angular.copy(this.states[stateName]);
  };

  Exploration.prototype.getInitialState = function() {
    return this.getState(this.initStateName);
  };

  // Static class methods. Note that "this" is not available in
  // static contexts.
  Exploration.create = function(explorationData) {
    return new Exploration(
      explorationData.init_state_name,
      explorationData.param_changes,
      explorationData.param_specs,
      explorationData.skin_customizations,
      explorationData.states,
      explorationData.title);
  };

  return Exploration;
}]);
