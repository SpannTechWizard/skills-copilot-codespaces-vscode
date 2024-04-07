function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'views/member/skills.html',
    controller: 'MemberSkillsCtrl',
    controllerAs: 'skills',
    bindToController: true,
    scope: {
      member: '='
    }
  };
}