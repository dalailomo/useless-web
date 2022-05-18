# CPP Resource waster

```cpp
/**
 * A useless program that creates
 * threads that waste CPU cycles with useless tasks
 */
#include <thread>
#include <chrono>
#include <cstdio>
​
using namespace std;
​
// a simple function that wastes CPU cycles "forever"
void useless_task() {
    printf("CPU Waster Process ID: %d\n", getpid());
    printf("CPU Waster Thread ID %d\n", this_thread::get_id());
    while(true) continue;
}
​
int main() {
    printf("Main Process ID: %d\n", getpid());
    printf("Main Thread ID: %d\n", this_thread::get_id());
    // start thread 1..
    thread thread1(useless_task);
    // start thread 2...
    thread thread2(useless_task);
​
    while(true) {
        this_thread::sleep_for(chrono::seconds(1));
    }
}
```
