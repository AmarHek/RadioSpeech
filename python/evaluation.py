import json
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from datetime import datetime

PATH_PADAWAN = "padawan.xlsx"
PATH_RADIO_SPEECH_EXPORT = "vmexport.json"
USERS_TO_EXCLUDE = ["-697348c5"]
REPORT_MIN_LENGTH_CHARS = 20

data_solutions = None
lines = open(PATH_RADIO_SPEECH_EXPORT).readlines()
users = {}


def countReports():
    sum = 0
    for user in users:
        sum += len(users[user])
    return sum


def filterUsers():
    for user in list(users.keys()):
        if user in USERS_TO_EXCLUDE:
            del users[user]
            print("Removed user " + user)


def filterReports():
    before = countReports()
    for user in users:
        for report in users[user]:
            if len(report["report"]) < REPORT_MIN_LENGTH_CHARS:
                users[user].remove(report)
    after = countReports()
    print(f"Removed {before - after} reports.")


def printReports():
    for user in users:
        print("----------------: " + user)
        for rep in users[user]:
            ts = int(rep["timestamp"] / 1000)
            print(str(datetime.fromtimestamp(ts)) + " Duration: " + str(
                round(int(rep["duration"]) / 1000, 0)) + " seconds" + " ID: " + str(rep["imageID"]))


def loadData():
    for line in lines:
        report = json.loads(line)
        if "pseudonym" not in report:
            print("Report with no pseudonym from:" + str(report["imageID"]))
            continue
        text = str(report["report"]).split("Judgement below:")[0]
        report["report"] = text
        pseudonym = report["pseudonym"]
        if pseudonym not in users:
            users[pseudonym] = []
        users[pseudonym].append(report)
    print(f"Found {len(lines)} reports by {len(users)} users.")


def allUsersWithSolutions():
    global users
    global data_solutions
    data_solutions = pd.read_excel("padawan.xlsx")
    data_solutions = data_solutions.dropna(subset=["Interne Nummerierung"])
    data_solutions = data_solutions.rename(
        columns={"Befund( 2018-01-08 00:00:00.0 <= x <= 2018-01-10 23:59:59.0) ": "report"})
    for user in users:
        for report in users[user]:
            img_id = int(report["imageID"])
            report["solution"] = data_solutions.loc[data_solutions["Interne Nummerierung"].astype(int) == img_id].iloc[
                0]
    return users


def allReportsWithSolutions():
    reports = allReports()
    global data_solutions
    data_solutions = pd.read_excel("padawan.xlsx")
    data_solutions = data_solutions.dropna(subset=["Interne Nummerierung"])
    data_solutions = data_solutions.rename(
        columns={"Befund( 2018-01-08 00:00:00.0 <= x <= 2018-01-10 23:59:59.0) ": "report"})
    for report in reports:
        img_id = int(report["imageID"])
        report["solution"] = data_solutions.loc[data_solutions["Interne Nummerierung"].astype(int) == img_id].iloc[0]
    return reports


def countSourceImages():
    print("Padawan Images:" + str(len(data_solutions)))


def allReports():
    reports = []
    for user in users:
        for report in users[user]:
            reports.append(report)
    return reports


def averageTime():
    sum = 0
    for report in allReports():
        sum += int(int(report["duration"]) / 1000)
    print("Average Duration: " + str(round(sum / len(allReports()), 2)))


def medianTime():
    reports = allReports()
    reports.sort(key=lambda x: int(x["duration"]))
    middle = int(len(reports) / 2)
    medtime = int(reports[middle]["duration"]) / 1000
    print("Median time: " + str(medtime))


# Dumps the report times for each user into a file named <pseudonym>_times.text into a subdirectory "out" for further
# processing.
def dumpTimes():
    for user in users:
        text = ""
        for report in users[user]:
            duration = int(int(report["duration"] / 1000))
            text += str(duration) + "\n"
        with open("out/" + user + "_times.txt", "w") as file:
            file.write(text)


def totalLengthDif():
    difs = []
    difpercents = []
    reports = allReportsWithSolutions()
    for rep in reports:
        difs.append(len(rep["report"]) - len(rep["solution"]["report"]))
        difpercents.append(len(rep["report"]) / len(rep["solution"]["report"]))
    difs.sort()
    print("Total Average Length difference:" + str(np.mean(difs)))
    print("Total Median Length difference:" + str(np.median(difs)))

    print("Total Average Length difference percent:" + str(np.mean(difpercents)))
    print("Total Median Length difference percent:" + str(np.median(difpercents)))
    smaller = 0
    for dif in difs:
        if dif < 0:
            smaller += 1
    print("A total of " + str(smaller) + " samples were shorter, and " + str(
        len(difs) - smaller) + " were longer than the gold standard.")


def reportCounts():
    counts = []
    for user in users:
        counts.append(len(users[user]))
    print("Total analyzed reports: " + str(np.sum(counts)))
    print("Counts per user: " + str(counts))


def plotLengths():
    users = allUsersWithSolutions()
    avgs_sample = []
    avgs_solution = []
    for user in users:
        sum_sample = 0
        sum_solution = 0
        for report in users[user]:
            sample_report = str(report["report"])
            solution_report = report["solution"]["report"]
            sum_sample += len(sample_report)
            sum_solution += len(solution_report)
        avgs_sample.append(sum_sample / len(users[user]))
        avgs_solution.append(sum_solution / len(users[user]))

    labels = ["Proband " + str(i + 1) for i in range(len(avgs_sample))]
    width = 0.3
    fig, ax = plt.subplots()
    x = np.arange(len(labels))
    ax.bar(x - width / 2, avgs_sample, width, label="Erhobene Befunde")
    ax.bar(x + width / 2, avgs_solution, width, label="PACS Befunde")
    ax.set_ylabel("Anzahl Zeichen")
    ax.set_xticks(x, labels)
    ax.spines.right.set_visible(False)
    ax.spines.top.set_visible(False)
    # ax.set_title("Durchschnittliche Befundlänge aufgeschlüsselt nach Probanden")
    ax.legend()
    plt.show()


loadData()
# printReports()
filterUsers()
filterReports()

print("------------")
reportCounts()
averageTime()
medianTime()
# dumpTimes()
totalLengthDif()
countSourceImages()
plotLengths()