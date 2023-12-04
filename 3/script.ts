Bun.file("3/input.txt")
    .text()
    .then((text) => text.split("\n").map((line) => line.split("")))
    .then((lines) => {
        lines.forEach((line, i) => {
            for (let j = 0; j < line.length; j++) {
                if (!isNaN(parseInt(line[j]))) {
                    const start = j;
                    let end = j;
                    console.log("test");
                    while (!isNaN(parseInt(line[end + 1]))) {
                        end++;
                        if (end === line.length - 1) {
                            break;
                        }
                    }
                    console.log(end);
                    const top =
                        lines[i - 1]?.slice(
                            start === 0 ? 0 : start - 1,
                            end + 1
                        ) ?? [];
                    const mid = lines[i].slice(
                        start === 0 ? 0 : start - 1,
                        end + 1
                    );
                    const bot =
                        lines[i + 1]?.slice(
                            start === 0 ? 0 : start - 1,
                            end + 1
                        ) ?? [];
                    if (
                        top.some((char) => char.match(/[^.\d]/i)) ||
                        mid.some((char) => char.match(/[^.\d]/i)) ||
                        bot.some((char) => char.match(/[^.\d]/i))
                    ) {
                        console.log(line.splice(start, end - start).join(""));
                    }
                    j = end - 1;
                }
            }
        });
    });
