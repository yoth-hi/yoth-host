import hupper
import sys
import server

def main():
    reloader = hupper.start_reloader('app.main')
    server.run()

if __name__ == "__main__":
    main()