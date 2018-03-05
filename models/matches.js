const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
  const Matches = sequelize.define('Matches', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    cancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    startTime: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    endTime: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    maxMaps: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    title: {
      type: DataTypes.STRING(60),
      defaultValue: null
    },
    skipVeto: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    apiKey: {
      type: DataTypes.STRING(32),
      defaultValue: null
    },
    vetoMappool: {
      type: DataTypes.STRING(160),
      defaultValue: null
    },
    team1Score: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    team2Score: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    team1String: {
      type: DataTypes.STRING(32),
      defaultValue: null
    },
    team2String: {
      type: DataTypes.STRING(32),
      defaultValue: null
    },
    forfeit: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    pluginVersion: {
      type: DataTypes.STRING(32),
      defaultValue: null
    }
  }, {
    tableName: 'matches'
  });

  Matches.associate = (models) => {
    Matches.hasMany(models.MapStats, {
      foreignKey: 'matchId',
      sourceKey: 'id'
    });
    Matches.hasMany(models.PlayerStats, {
      foreignKey: 'matchId',
      sourceKey: 'id'
    });
  };

  Matches.prototype.buildMatchDict = async function() {
    const dict = {
      matchid: this.id.toString(),
      match_title: this.title,
      skip_veto: this.skipVeto ? this.skipVeto : false
    };

    if (this.maxMaps === 2) {
      dict.bo2_series = true;
    } else {
      dict.maps_to_win = this.maxMaps / 2 + 1;
    }

    const addTeamData = async(teamKey, teamId, matchText) => {
      const team = await sequelize.models.Teams.findById(teamId);

      if (!team) {
        return;
      }

      dict[teamKey] = {};

      const addIf = (key, value) => {
        if (value) {
          dict[teamKey][key] = value;
        }
      };

      addIf('name', team.name);
      addIf('tag', team.tag);
      addIf('flag', team.flag.toUpperCase());
      addIf('logo', team.logo);
      addIf('matchtext', matchText);
    };

    await addTeamData('team1', this.team1Id, this.team1String);
    await addTeamData('team2', this.team2Id, this.team2String);

    dict.cvars = {};

    /**
      def add_team_data(teamkey, teamid, matchtext):

              d[teamkey]['players'] = filter(lambda x: x != '', team.auths)

          d['cvars']['get5_web_api_url'] = url_for(
              'home', _external=True, _scheme='http')
       */

    if (this.vetoMappool) {
      dict.maplist = [];

      _.forEach(this.vetoMappool.split(' '), (map) => {
        dict.maplist.push(map);
      });
    }

    return dict;
  };

  Matches.prototype.finalized = function() {
    return this.cancelled || this.finished();
  };

  Matches.prototype.finished = function() {
    return this.endTime && !this.cancelled;
  };

  Matches.prototype.getStatusString = function(showWinner = true) {
    if (this.pending()) {
      return 'Pending';
    } else if (this.live()) {
      const [team1Score, team2Score] = this.getCurrentScore();

      return `Live, ${team1Score}:${team2Score}`;
    } else if (this.finished()) {
      const [team1Score, team2Score] = this.getCurrentScore();
      const minScore = Math.min(team1Score, team2Score);
      const maxScore = Math.max(team1Score, team2Score);
      const scoreString = `${maxScore}:${minScore}`;

      if (!showWinner) {
        return 'Finished';
      } else if (this.winner === this.team1Id) {
        return `Won ${scoreString} by ${this.getTeam1().name}`;
      } else if (this.winner === this.team2Id) {
        return `Won ${scoreString} by ${this.getTeam2().name}`;
      } else {
        return `Tied ${scoreString}`;
      }
    } else {
      return 'Cancelled';
    }
  };

  Matches.prototype.getLoser = function() {
    if (this.team1Score > this.team2Score) {
      return this.getTeam2();
    } else if (this.team2Score > this.team1Score) {
      return this.getTeam1();
    } else {
      return;
    }
  };

  Matches.prototype.getServer = async function() {
    const server = await sequelize.models.GameServers.findById(this.serverId);

    return server;
  };

  Matches.prototype.getTeam1 = async function() {
    const team1 = await sequelize.models.Teams.findById(this.team1Id);

    return team1;
  };

  Matches.prototype.getTeam2 = async function() {
    const team2 = await sequelize.models.Teams.findById(this.team2Id);

    return team2;
  };

  Matches.prototype.getUser = async function() {
    const user = await sequelize.models.Users.findById(this.userId);

    return user;
  };

  Matches.prototype.getWinner = function() {
    if (this.team1Score > this.team2Score) {
      return this.getTeam1();
    } else if (this.team2Score > this.team1Score) {
      return this.getTeam2();
    } else {
      return;
    }
  };

  Matches.prototype.live = function() {
    return this.startTime && !this.endTime && !this.cancelled;
  };

  Matches.prototype.pending = function() {
    return this.startTime && !this.cancelled;
  };

  return Matches;
};
