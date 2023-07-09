import java.awt.Robot;
import java.awt.event.MouseEvent;

public class Main {
    public static void main(String[] args) throws Exception
    {
        int delay = 5;

        //If args is provided, make sure that's a number. If not, L bozo 5s it is
        if (args.length > 0 && args[0] != null)
        {
            try
            {
                delay = Integer.parseUnsignedInt(args[0]);
            }
            catch (NumberFormatException err)
            {
                System.out.println("L bozo that's not a valid delay.");
                return;
            }
        }

        Robot leBot = new Robot();

        while (true)
        {
            leBot.mousePress(MouseEvent.BUTTON1_DOWN_MASK);
            leBot.mouseRelease(MouseEvent.BUTTON1_DOWN_MASK);
            Thread.sleep(delay * 1000);
        }
    }
}
