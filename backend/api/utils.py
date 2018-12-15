from datetime import datetime
import pytz
import timeago

from flask_restplus import fields


class TimeAgo(fields.DateTime):

    def format(self, value):
        try:
            value = self.parse(value)
            now = datetime.now(pytz.UTC)
            return timeago.format(value, now)
        except (AttributeError, ValueError) as e:
            raise fields.MarshallingError(e)
