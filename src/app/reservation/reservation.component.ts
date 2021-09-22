import { DatePipe } from '@angular/common';
import { ReservationService } from '../reservation/service/reservation.service'
import { reservation } from '../reservation/model/reservation-table';
import { FormControl, FormGroup, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { from, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { TokenStorageService } from '../AuthentificationFolder/service/token-storage.service';
import { AjaxResponse } from 'rxjs-compat';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-reservation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./reservation.component.css'],
  templateUrl: './reservation.component.html',
})
export class ReservationComponent {
  LocalTP: any;
  JSONid: string;
  JSONnom: any;
  id_tp;
  currentUser: any;
  reservationForm = new FormGroup({
    motdepass: new FormControl(''),
    debut: new FormControl(''),
    fin: new FormControl(''),
    id_tp: new FormControl('')
  });
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('modalContent1', { static: true }) modalContent1: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  modalData1: {
    newEvent: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {

      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];






  activeDayIsOpen: boolean = true;


  constructor(private modal: NgbModal, private reservationService: ReservationService,
    private datePipe: DatePipe, private token: TokenStorageService,
    private router: ActivatedRoute
  ) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  hourSegmentClicked(event) {
    let newEvent: CalendarEvent =
    {
      title: 'reserved',

      //start: event.date,
      start: new Date(this.datePipe.transform(event.date, "yyyy/MM/dd hh:mm:ss")),
      end: new Date(this.datePipe.transform(addHours(event.date, 1), "yyyy/MM/dd hh:mm:ss"))

    }

    this.modalData1 = { newEvent };
    this.modal.open(this.modalContent1, { size: 'lg' });


  }
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  async addreservation(e) {
    console.log({
      debut: Date.parse(this.reservationForm.get('debut').value),
      fin: Date.parse(this.reservationForm.get('fin').value),
      motdepass: this.reservationForm.get('motdepass').value,
      tp: this.LocalTP
    });

    e.stopPropagation()
    {
      this.reservationService.newreservation({
        debut: Date.parse(this.reservationForm.get('debut').value),
        fin: Date.parse(this.reservationForm.get('fin').value),
        motdepass: this.reservationForm.get('motdepass').value,
        tp: this.LocalTP
      }).then(() => {

        console.warn("success");
        this.events.push({
          title: 'reserved',
          start: this.reservationForm.get('debut').value,
          end: this.reservationForm.get('debut').value
        })
        this.refresh.next();

      })

    }

  }

  public myEvents: [];

  ngOnInit() {

    //this.id_tp = this.router.snapshot.params;

    const id = this.router.snapshot.paramMap.get("dynamicParameter");

    this.reservationService.getTPdata(id).then((resp) => {
      this.LocalTP = resp.data[0];
      console.log(resp.data[0])

    });

    this.currentUser = this.token.getUser();
    // this.reloadData();
    //  this.tableformationservice.getAllFormation().subscribe((formations:formation[]) => { this.formations = formations }, err => { });
    this.reservationService.getAllreservation().then((resp) => {
      this.myEvents = resp.data,
        this.myEvents.forEach(element => {

          var d = JSON.parse(element[("debut")]);
          const dateObject1 = new Date(d)
          const humanDateFormat1 = dateObject1.toISOString()
          var d = JSON.parse(element[("fin")]);
          const dateObject2 = new Date(d)
          const humanDateFormat2 = dateObject2.toISOString()


          this.events.push({
            start: new Date(humanDateFormat1),
            end: new Date(humanDateFormat2),
            title: 'reservé',

          });
        });
      this.refresh.next();




    });



  }


}

