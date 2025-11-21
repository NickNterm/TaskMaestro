"""
API Models
"""
from django.db import models


class Status(models.TextChoices):
    PENDING = 'pending'
    COMPLETED = 'completed'
#    CANCELLED = 'cancelled'



class KindReminder(models.Model):
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=100,choices=Status.choices,default=Status.PENDING)

    class Meta:
        verbose_name = 'Kind Reminder'
        verbose_name_plural = 'Kind Reminders'

    def __str__(self):
        return self.name


class deadlines(models.Model):
#     name = models.CharField(max_length=100)
#     status = models.CharField(max_length=100,choices=Status.choices,default=Status.PENDING)

    start_date = models.DateField()
    end_date = models.DateField()
    remind_me_at = models.DateTimeField()
    status = models.CharField(max_length=100,choices=Status.choices,default=Status.PENDING)


    class Meta:
        verbose_name = 'Deadline'
        verbose_name_plural = 'Deadlines'

    def __str__(self):
        return f"Deadline: {self.start_date} to {self.end_date}"



class DailyTasks(models.Model):
    text = models.TextField()
    status = models.CharField(max_length=100,choices=Status.choices,default=Status.PENDING)

    class Meta:
        verbose_name = 'Daily Task'
        verbose_name_plural = 'Daily Tasks'

    def __str__(self):
        return self.text


class SpecialDays(models.Model):
    description = models.TextField()
    datetime = models.DateField()

    class Meta:
        verbose_name = 'Special Day'
        verbose_name_plural = 'Special Days'

    def __str__(self):
        return f"{self.description} - {self.datetime}"