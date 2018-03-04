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

  Matches.prototype.buildMatchDict = function() {
    const dict = {
      matchid: this.id.toString(),
      match_title: this.title,
      skip_veto: this.skipVeto
    };

    if (this.maxMaps === 2) {
      dict.bo2_series = true;
    } else {
      dict.maps_to_win = this.maxMaps / 2 + 1;
    }

    /**
     def add_team_data(teamkey, teamid, matchtext):
            team = Team.query.get(teamid)
            if not team:
                return
            d[teamkey] = {}

            # Add entries if they have values.
            def add_if(key, value):
                if value:
                    d[teamkey][key] = value
            add_if('name', team.name)
            add_if('name', team.name)
            add_if('tag', team.tag)
            add_if('flag', team.flag.upper())
            add_if('logo', team.logo)
            add_if('matchtext', matchtext)
            d[teamkey]['players'] = filter(lambda x: x != '', team.auths)

        add_team_data('team1', self.team1_id, self.team1_string)
        add_team_data('team2', self.team2_id, self.team2_string)

        d['cvars'] = {}

        d['cvars']['get5_web_api_url'] = url_for(
            'home', _external=True, _scheme='http')
     */

    if (this.vetoMapvool) {
      dict.maplist = [];

      _.forEach(this.vetoMappool.split(), (map) => {
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

  Matches.prototype.live = function() {
    return this.startTime && !this.endTime && !this.cancelled;
  };

  Matches.prototype.pending = function() {
    return this.startTime && !this.cancelled;
  };

  return Matches;
};
